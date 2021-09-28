'use strict'
const Quotation = use("App/Models/Quotation")
const Necesidad = use("App/Models/Necesidad")
const Chat = use("App/Models/Chat")
const Country = use("App/Models/Country")
const City = use("App/Models/City")
const Categoria = use("App/Models/Categoria")
const Notification = use("App/Models/Notification")
const User = use("App/Models/User")
const moment = require('moment')
var ObjectId = require('mongodb').ObjectId;


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with quotations
 */
class QuotationController {
  /**
   * Show a list of all quotations.
   * GET quotations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new quotation.
   * GET quotations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new quotation.
   * POST quotations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = ((await auth.getUser()).toJSON())._id
    let body = request.all()
    body.supplier_id = new ObjectId(user)
    body.status = 0
    body.isActive = false
    const quotation = (await Quotation.create(body)).toJSON()

    let chat = {}
    chat.message = body.message
    chat.user_id = user
    chat.quotation_id = quotation._id
    chat.viewed = false
    let message = (await Chat.create(chat)).toJSON()
    let updateQuotation = await Quotation.query().where('_id', quotation._id).update({ last_message_id: message._id, created_at_message: message.created_at })
    const notificationBody = {
      name: body.name,
      message: body.message,
      user_id: new ObjectId(body.client_id),
      status: true
    }
    const notification = await Notification.create(notificationBody)
    response.send(quotation)

  }

  async updateQuotation ({ response, params, request }) {
    let body = request.all()
    if (body.status === undefined) {
      let updateQuotation = await Quotation.query().where('_id', params.id).update({ status: 1 })
      let quotation = (await Quotation.query().find(params.id)).toJSON()
      let updateRequest = await Necesidad.query().where('_id', quotation.request_id).update({ status: 1 })
      response.send(updateQuotation)
    } else if (body.status === 1) {
      let updateQuotation = await Quotation.query().where('_id', params.id).update({ date: body.date })
      let quotation = (await Quotation.query().find(params.id)).toJSON()
      let updateRequest = await Necesidad.query().where('_id', quotation.request_id).update({ isExtend: false })
      response.send(updateQuotation)

    } else if (body.status === 2) {
      let today = moment().format('YYYY/MM/DD')
      let updateQuotation = await Quotation.query().where('_id', params.id).update({ status: 2, endDate: today })
      let quotation = (await Quotation.query().find(params.id)).toJSON()
      let updateRequest = await Necesidad.query().where('_id', quotation.request_id).update({ status: 2, endDate: today, isFinished: false })
      response.send(updateQuotation)
    } else if (body.status === 3) {
      const updateRequest = await Necesidad.query().where('_id', params.id).update({ status: 3 })
      const updateQuotation = await Quotation.query().where('request_id', params.id).update({ status: 3 })
      response.send(updateQuotation)
    }

  }

  async isNewMessages ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    if (user.roles[0] === 2) {
      let send = {}
      let quotations = (await Quotation.query().where('client_id', params.id).with('data_request').with('data_supplier').fetch()).toJSON()
      for (let i in quotations) {
        let request = (await Necesidad.query().find(quotations[i].request_id)).toJSON()
        if (request.status === 1 && request.isExtend === false) {
          send.quotationExtend = true
          send.idQuotationExtend = quotations[i]._id
          console.log('que estas haciendo');
        }
        if (request.status === 2 && request.isFinished === false) {
          send.quotationFinished = true
          send.idQuotationFinished = quotations[i]._id
          send.finished = quotations[i]
          send.supplier = quotations[i].data_supplier
        }
        let lastMessage = (await Chat.query().find(quotations[i].last_message_id)).toJSON()
        if (lastMessage.viewed === false && lastMessage.user_id !== user._id) {
          send.newMessages = true
          send.chat = quotations[i]._id
        }
      }
      response.send(send)
    }
    if (user.roles[0] === 3) {
      let send = {}
      const id = new ObjectId(params.id)
      let quotations = (await Quotation.query().where('supplier_id', id).fetch()).toJSON()
      for (let i in quotations) {
        if (quotations[i].status === 1 && quotations[i].isActive === false) {
          send.quotationActive = true
          send.idQuotation = quotations[i]._id
        }
        let lastMessage = (await Chat.query().find(quotations[i].last_message_id)).toJSON()
        if (lastMessage.viewed === false && lastMessage.user_id !== user._id) {
          send.chat = quotations[i]._id
          send.newMessages = true
          break
        }
      }
      response.send(send)
    }
  }

  async showAllChats ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let rol = user.roles[0]
    let quotations = []
    if (rol === 2) {
      quotations = (await Quotation.query().where({ client_id: user._id, $or: [{ status: 1 }, { status: 2 }] }).with('data_supplier').with('data_request').with('lastMessage').fetch()).toJSON()
    } else if (rol === 3) {
      const id = new ObjectId(user._id)
      quotations = (await Quotation.query().where({ supplier_id: id, $or: [{ status: 1 }, { status: 2 }] }).with('data_client').with('data_request.categorianame').with('lastMessage').fetch()).toJSON()
    }
    quotations.sort((a, b) => new Date(a.created_at_message).getTime() > new Date(b.created_at_message).getTime())
    quotations.reverse()
    for (let i = 0; i < quotations.length; i++) {
      let creationDate = moment(quotations[i].data_request.created_at).format('DD/MM/YYYY')
      quotations[i].data_request.creationDate = creationDate
      let services = []
      if (quotations[i].created_at_message) {
        quotations[i].created_at_message = moment(quotations[i].created_at_message).lang('es').calendar()
      }
      let lastMessage = (await Chat.query().find(quotations[i].last_message_id)).toJSON()
      if (lastMessage.viewed === false) {
        quotations[i].viewed = false
      }
      if (quotations[0].data_supplier) {
        let city = (await City.query().find(quotations[i].data_supplier.city)).toJSON()
        let country = (await Country.query().find(quotations[i].data_supplier.country)).toJSON()
        quotations[i].city = city.name
        quotations[i].country = country.name
        for (let j in quotations[i].data_supplier.categorias) {
          let service = (await Categoria.query().find(quotations[i].data_supplier.categorias[j])).toJSON()
          services.push(service)
        }
      } else if (quotations[0].data_client) {
        let city = (await City.query().find(quotations[i].data_client.city)).toJSON()
        let country = (await Country.query().find(quotations[i].data_client.country)).toJSON()
        quotations[i].city = city.name
        quotations[i].country = country.name
        for (let j in quotations[i].data_client.categorias) {
          let service = (await Categoria.query().find(quotations[i].data_client.categorias[j])).toJSON()
          services.push(service)
        }
      }
      quotations[i].services = services
    }
    response.send(quotations)
  }

  async showAllMessages ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const id_user = user._id
    let quotation = (await Quotation.query().where('_id', params.id).with('data_request').with('lastMessage').with('data_client').fetch()).toJSON()
    let category = (await Categoria.query().find(quotation[0].data_request.categoria_id)).toJSON()
    let client = (await User.query().find(quotation[0].data_request.ownerId)).toJSON()
    let creationDate = moment(quotation[0].data_request.created_at).format('DD/MM/YYYY')
    quotation[0].data_request.creationDate = creationDate
    quotation[0].data_request.categoryName = category.name
    quotation[0].data_request.fullName = client.full_name + ' ' + client.last_name
    let send = {
      datos_proveedor: quotation[0].supplier_id,
      datos_cliente: quotation[0].client_id,
      data_client: quotation[0].data_client,
      messages: [],
      status: quotation[0].status,
      id_cotization: quotation[0]._id,
      nombre_necesidad: quotation[0].data_request.name,
      data_request: quotation[0].data_request,
      lastMessage: quotation[0].lastMessage,
      message: quotation[0].message,
      date: quotation[0].date,
      price: quotation[0].price,
      isActive: quotation[0].isActive
    }
    let messages = (await Chat.where({ quotation_id: params.id }).with('datos_user').fetch()).toJSON()
    send.messages = messages
    send.messages = messages.map(v => {
      return {
        send: id_user === v.user_id ? true : false,
        rol: v.datos_user.roles[0],
        message: v.message,
        stamp: moment(v.created_at).lang('es').calendar(),
        full_name: v.datos_user.full_name
      }
    })
    response.send(send)
  }

  async sendMessage ({ request, response, auth, params }) {
    const user_id = ((await auth.getUser()).toJSON())._id
    let body = request.only(['message'])
    body.user_id = user_id
    body.quotation_id = params.id
    body.viewed = false
    let message = (await Chat.create(body)).toJSON()
    let updateQuotation = await Quotation.query().where('_id', body.quotation_id).update({ last_message_id: message._id, created_at_message: message.created_at })
    response.send(message)
  }

  async showAllCotizations3 ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotizaciones = []
    let today = moment().format('YYYY/MM/DD')
    if (user.roles[0] === 2) {
      cotizaciones = (await Quotation.query().where({ client_id: user._id, status: 1 }).with('data_supplier').with('data_request.categorianame').fetch()).toJSON()
    } else {
      const id = new ObjectId(user._id)
      cotizaciones = (await Quotation.query().where({ supplier_id: id, status: 1 }).with('data_client').with('data_request.categorianame').fetch()).toJSON()
    }
    for (let i = 0; i < cotizaciones.length; i++) {
      let dat = (await Necesidad.query().where({ _id: cotizaciones[i].necesidad_id }).fetch()).toJSON()
      cotizaciones[i].datos_necesidad = dat[0]
      if (cotizaciones[i].fecha_termino && today > cotizaciones[i].fecha_termino && cotizaciones[i].status !== 'Terminado') {
        let updat = await Quotation.query().where('_id', cotizaciones[i]._id).update({ status: 'Atrasado' })
      }
    }
    let formatearFecha = cotizaciones.map(v => {
      return {
        ...v,
        colorRadio: v.data_request.necesidad === 'Urgente (1 a 3 Horas)' ? 'red' : v.data_request.necesidad === 'Medio (5 a 24 Horas)' ? 'orange' : 'blue',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }
  async messageSeen ({ params, response}) {
    let updateChat = await Chat.query().where('_id', params.id).update({ viewed: true })
    response.send(true)
  }
  async quotationActive ({ params, response}) {
    let updateQuotation = await Quotation.query().where('_id', params.id).update({ isActive: true })
    response.send(true)
  }
  async quotationExtend ({ params, response}) {
    let updateRequest= await Necesidad.query().where('_id', params.id).update({ isExtend: true })
    response.send(true)
  }
  async quotationFinished ({ params, response}) {
    let updateRequest = await Necesidad.query().where('_id', params.id).update({ isFinished: true })
    response.send(true)
  }

  /**
   * Display a single quotation.
   * GET quotations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing quotation.
   * GET quotations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update quotation details.
   * PUT or PATCH quotations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a quotation with id.
   * DELETE quotations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = QuotationController
