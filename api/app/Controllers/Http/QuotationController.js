'use strict'
const Quotation = use("App/Models/Quotation")
const Chat = use("App/Models/Chat")
const Country = use("App/Models/Country")
const City = use("App/Models/City")
const Categoria = use("App/Models/Categoria")
const User = use("App/Models/User")
const moment = require('moment')


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
    body.supplier_id = user
    const quotation = (await Quotation.create(body)).toJSON()

    let chat = {}
    chat.message = body.message
    chat.user_id = user
    chat.quotation_id = quotation._id
    chat.viewed = false
    let message = (await Chat.create(chat)).toJSON()
    let updateQuotation = await Quotation.query().where('_id', quotation._id).update({ last_message_id: message._id, created_at_message: message.created_at })
    response.send(quotation)

  }

  async isNewMessages ({ params, response, auth }) {
    let quotations = (await Quotation.query().where('client_id', params.id).fetch()).toJSON()
    for (let i in quotations) {
      let lastMessage = (await Chat.query().find(quotations[i].last_message_id)).toJSON()
      if (lastMessage.viewed === false) {
        response.send(true)
        break
      }
    }
  }

  async showAllChats ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let rol = user.roles[0]
    let quotations = []
    if (rol === 2) {
      console.log(rol);
      quotations = (await Quotation.query().where('client_id', user._id).with('data_supplier').with('data_request').fetch()).toJSON()
      console.log('quotations :>> ', quotations);
    } else {
      console.log(rol);
      quotations = (await Quotation.query().where('supplier_id', user._id).with('data_client').with('data_request').fetch()).toJSON()
    }
    for (let i = 0; i < quotations.length; i++) {
      if (quotations[i].created_at_message) {
        quotations[i].created_at_message = moment(quotations[i].created_at_message).lang('es').calendar()
      }
      let lastMessage = (await Chat.query().find(quotations[i].last_message_id)).toJSON()
      if (lastMessage.viewed === false) {
        quotations[i].viewed = false
      }
      let city = (await City.query().find(quotations[i].data_supplier.city)).toJSON()
      let country = (await Country.query().find(quotations[i].data_supplier.country)).toJSON()
      quotations[i].city = city.name
      quotations[i].country = country.name
      let services = []
      for (let j in quotations[i].data_supplier.categorias) {
        let service = (await Categoria.query().find(quotations[i].data_supplier.categorias[j])).toJSON()
        services.push(service)
      }
      quotations[i].services = services
    }
    response.send(quotations)
  }

  async showAllMessages ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const id_user = user._id
    let quotation = (await Quotation.query().where('_id', params.id).with('data_request').fetch()).toJSON()
    let category = (await Categoria.query().find(quotation[0].data_request.categoria_id)).toJSON()
    let client = (await User.query().find(quotation[0].data_request.ownerId)).toJSON()
    console.log('quotation :>> ', quotation);
    let creationDate = moment(quotation[0].created_at).format('DD/MM/YYYY')
    quotation[0].data_request.creationDate = creationDate
    quotation[0].data_request.categoryName = category.name
    quotation[0].data_request.fullName = client.full_name + ' ' + client.last_name
    let send = {
      datos_proveedor: quotation[0].supplier_id,
      datos_cliente: quotation[0].client_id,
      messages: [],
      status: quotation[0].status,
      id_cotization: quotation[0]._id,
      nombre_necesidad: quotation[0].data_request.name,
      data_request: quotation[0].data_request,
    }
    console.log('send.datos_cliente :>> ', send.datos_cliente);
    console.log('send.datos_proveedor :>> ', send.datos_proveedor);
    let messages = (await Chat.where({ cotisazion_id: params.id_cotisation }).with('datos_user').fetch()).toJSON()
    send.messages = messages
    send.messages = messages.map(v => {
      return {
        send: id_user === v.user_id ? true : false,
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
