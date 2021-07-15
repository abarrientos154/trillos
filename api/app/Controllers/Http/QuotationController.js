'use strict'
const Quotation = use("App/Models/Quotation")
const Chat = use("App/Models/Chat")
const Country = use("App/Models/Country")
const City = use("App/Models/City")
const Categoria = use("App/Models/Categoria")
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
