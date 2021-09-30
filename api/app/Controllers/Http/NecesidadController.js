'use strict'
const Necesidad = use("App/Models/Necesidad")
const ChatMessage = use("App/Models/ChatMessage")
const Quotation = use("App/Models/Quotation")
const Opinion = use("App/Models/Opinion")
const Categorias = use("App/Models/Categoria")
const User = use("App/Models/User")
const Notification = use("App/Models/Notification")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const moment = require('moment')
var ObjectId = require('mongodb').ObjectId
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with necesidads
 */
class NecesidadController {
  /**
   * Show a list of all necesidads.
   * GET necesidads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    let data = (await Necesidad.query().where({}).with('creador').fetch()).toJSON()
    let filter = data.filter(v => v.creador.enable && !v.cotizado)
    response.send(filter)
  }

  async necesidadByUserId ({ response, params }) {
    let data = (await Necesidad.query().where({ownerId: params.user_id}).with('creador').fetch()).toJSON()
    for (let i = 0; i < data.length; i++) {
      if (data[i].isQualified && data[i].isQualified === true) {
        data[i].opinion = (await Opinion.query().where('request_id', data[i]._id).first()).toJSON()
      }
      if (data[i].status === 0) {
        const quotation = await Quotation.query().where('request_id', data[i]._id).first()
        if (quotation !== null && quotation.status !== 3) {
          data[i].isQuoted = true
        }
      }
      data[i].chat_info = await ChatMessage.findBy('necesidad_id', data[i]._id.toString())
      data[i].colorRadio = data[i].necesidad === 'Express (Permite recibir cotizaciones hasta 3 horas)' ? 'red' : 'blue',
      data[i].fechaCreacion = moment(data[i].created_at).format('DD/MM/YYYY')
      data[i].categoriaInfo = (await Categorias.query().where('_id', data[i].categoria_id).first()).toJSON()
    }
    response.send(data)
  }

  async necesidadByProveedorId ({ response, params }) {
    const id = new ObjectId(params.prov_id)
    let data = (await Quotation.query().where({supplier_id: id}).fetch()).toJSON()
    for (let i = 0; i < data.length; i++) {
      data[i].creador = (await User.query().where('_id', data[i].client_id).first()).toJSON()
      data[i].necesidad = (await Necesidad.query().where('_id', data[i].request_id).first()).toJSON()
      if (data[i].necesidad.isQualified && data[i].necesidad.isQualified === true) {
        data[i].opinion = (await Opinion.query().where('request_id', data[i].necesidad._id).first()).toJSON()
      }
      data[i].colorRadio = data[i].necesidad.necesidad === 'Express (Permite recibir cotizaciones hasta 3 horas)' ? 'red' : 'blue',
      data[i].fechaCreacion = moment(data[i].necesidad.created_at).format('DD/MM/YYYY')
      data[i].categoriaInfo = (await Categorias.query().where('_id', data[i].necesidad.categoria_id).first()).toJSON()
    }
    response.send(data)
  }

  async necesidadByAll ({ response, params }) {
    let datos = (await Necesidad.query().where({}).with('creador').fetch()).toJSON()
    for (let j of datos) j.chat_info = await ChatMessage.findBy('necesidad_id', j._id.toString())
    response.send(datos)
  }

  async necesidades ({ response, params, auth }) {
    try {  
      const user = (await auth.getUser()).toJSON()
      let data = (await Necesidad.query().where({ status: 0 }).with('creador').with('categorianame').fetch()).toJSON()
      let quotations = (await Quotation.query().where({}).fetch()).toJSON()
      let requests = []

      for (let x in quotations) {
        for (let k in data) {
          if (data[k]._id === quotations[x].request_id && quotations[x].supplier_id === user._id && quotations[x].status !== 3) {
            data[k].isQuoted = true
            data[k].chat = quotations[x]._id
          }
        }
      }
  
      for (let j of data) j.chat_info = await ChatMessage.findBy('necesidad_id', j._id.toString())
      let filters = []
      for (let g of user.categorias) {
        let filterNecesidad = data.filter(v => v.categoria_id === g)
        filters = filters.concat(filterNecesidad)
      }
      let formatearFecha = filters.map(v => {
        return {
          ...v,
          fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
        }
      })
      let needsByCity = []
      for (let n in formatearFecha) {
        if (formatearFecha[n].creador.city === user.city) {
          needsByCity.push(formatearFecha[n])
        }
      }
      response.send(needsByCity)
    } catch (error) {
      console.error('necesidades: ' + error.message)
    }
  }

  /**
   * Render a form to be used for creating a new necesidad.
   * GET necesidads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new necesidad.
   * POST necesidads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Necesidad.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('solicitudFiles_' + i, {
            types: ['image'],
            size: '20mb'
          })
          if (Helpers.appRoot('storage/uploads/necesidades')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/necesidades'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images.push(profilePic.fileName)
        }
        dat.images = images

      }
      let body = dat
      body.status = 0
      delete body.cantidadArchivos
      const user = (await auth.getUser()).toJSON()
      body.ownerId = user._id
      let need = await Necesidad.create(body)
      const users = (await User.query().where({ roles: [3] }).fetch()).toJSON()
      for (const i in users) {
        if (user.city === users[i].city) {
          for (const j in users[i].categorias) {
            if (body.categoria_id = users[i].categorias[j]) {
              const notificationBody = {
                name: body.name,
                user_id: new ObjectId(users[i]._id),
                status: true
              }
              const notification = await Notification.create(notificationBody)
            }
          }
        }
      }
      response.send(need)
    }
  }

  /**
   * Display a single necesidad.
   * GET necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let data = await Necesidad.find(params.id)
    let quotations = (await Quotation.query().where({}).fetch()).toJSON()
    let newFecha = moment(data.created_at).format('DD/MM/YYYY')
    let hora = moment(data.created_at).format('h:mm:ss a');
    data.hora = hora
    data.newFecha = newFecha
    let color = data.necesidad === 'Express (Permite recibir cotizaciones hasta 3 horas)' ? 'red' : 'blue'
    data.colorRadio = color
    let res = {
      data
    }
    for (let x in quotations) {
      if (params.id === quotations[x].request_id && quotations[x].status === 0) {
        res.isQuoted = true
      }
    }
    response.send(res)
  }

  /**
   * Render a form to update an existing necesidad.
   * GET necesidads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {datoiew} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update necesidad details.
   * PUT or PATCH necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Necesidad.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('solicitudFiles_' + i, {
            types: ['image']
          })
          if (Helpers.appRoot('storage/uploads/necesidades')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/necesidades'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images.push(profilePic.fileName)
        }
        let necesidad = await Necesidad.find(params.id)

        /* for (let j of dat.images) {
          fs.unlink(`storage/uploads/necesidades/${j}`, (err) => {
            if (err) throw err;
            console.log(`${j} Eliminado por el Cliente`);
          });
        } */
        dat.images = [...necesidad.images, ...images]
      }
      delete dat.cantidadArchivos
      let modificar = await Necesidad.query().where('_id', params.id).update(dat)
      response.send(modificar)
    }
  }
  async cambioestado ({ params, response }) {
    let modificar = await Necesidad.query().where('_id', params.id).update({ status: params.status })
    response.send(modificar)
  }

  /**
   * Delete a necesidad with id.
   * DELETE necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let eliminar = await Necesidad.find(params.id)
    for (let j of eliminar.images) {
      fs.unlink(`storage/uploads/necesidades/${j}`, (err) => {
        if (err) throw err;
        console.log(`${j} Eliminado por el Cliente`);
      });
    }
    eliminar.delete()
    response.send(eliminar)
  }

  async necesidadByCategoriaId ({ params, response }) {
    let data = (await Necesidad.query().where('categoria_id', params.categoria_id).with('creador').fetch()).toJSON()
    let filter = data.filter(v => v.creador.enable && !v.cotizado)
    response.send(filter)
  }
}

module.exports = NecesidadController
