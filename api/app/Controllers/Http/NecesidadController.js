'use strict'
const Necesidad = use("App/Models/Necesidad")
const ChatMessage = use("App/Models/ChatMessage")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const moment = require('moment')
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
    let datos = (await Necesidad.query().where({}).with('creador').fetch()).toJSON()
    let filter = datos.filter(v => v.creador.enable && !v.cotizado)
    response.send(filter)
  }

  async necesidadByUserId ({ response, params }) {
    let datos = (await Necesidad.query().where({ownerId: params.user_id}).with('creador').fetch()).toJSON()
    for (let j of datos) j.chat_info = await ChatMessage.findBy('necesidad_id', j._id.toString())
    response.send(datos)
  }

  async necesidadByAll ({ response, params }) {
    let datos = (await Necesidad.query().where({}).with('creador').fetch()).toJSON()
    for (let j of datos) j.chat_info = await ChatMessage.findBy('necesidad_id', j._id.toString())
    response.send(datos)
  }

  async necesidades ({ response, params, auth }) {
    try {  
      const user = (await auth.getUser()).toJSON()
      let data = (await Necesidad.query().where({}).with('creador').with('categorianame').fetch()).toJSON()
  
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
      console.log('needsByCity :>> ', needsByCity);
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
    let recibir = request.all()
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
      body.ownerId = ((await auth.getUser()).toJSON())._id
      let guardar = await Necesidad.create(body)
      response.send(guardar)
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
    let dato = await Necesidad.find(params.id)
    let newFecha = moment(dato.created_at).format('DD/MM/YYYY')
    let hora = moment(dato.created_at).format('h:mm:ss a');
    dato.hora = hora
    dato.newFecha = newFecha
    let color = dato.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : dato.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue'
    dato.colorRadio = color
    response.send(dato)
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
        for (let j of dat.images) {
          fs.unlink(`storage/uploads/necesidades/${j}`, (err) => {
            if (err) throw err;
            console.log(`${j} Eliminado por el Cliente`);
          });
        }
        dat.images = images
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
    let datos = (await Necesidad.query().where('categoria_id', params.categoria_id).with('creador').fetch()).toJSON()
    let filter = datos.filter(v => v.creador.enable && !v.cotizado)
    response.send(filter)
  }
}

module.exports = NecesidadController
