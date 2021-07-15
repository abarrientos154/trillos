'use strict'
const Quotation = use("App/Models/Quotation")
const Chat = use("App/Models/Chat")


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
