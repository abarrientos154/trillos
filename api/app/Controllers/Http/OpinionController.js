'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with opinions
 *
 */
const Opinion = use("App/Models/Opinion")
const Quotation = use("App/Models/Quotation")
const Necesidad = use("App/Models/Necesidad")
const Chatmessage = use ("App/Models/ChatMessage")
const User = use("App/Models/User")
const moment = require('moment')


class OpinionController {
  /**
   * Show a list of all opinions.
   * GET opinions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params, auth }) {
    const user = (await auth.getUser()).toJSON()
    let opiniones = (await Opinion.query().where({necesidad_id: params.necesidad_id, cliente: user.roles[0] === 2 ? false : true}).with('calificador_info').with('calificado_info').fetch()).toJSON()
    let formatearFecha = opiniones.map(v => {
      return {
        ...v,
        created_at: moment(v.created_at).locale('es').calendar()
      }

    })
    response.send(formatearFecha)
  }

  async todos ({ request, response, params, auth }) {
    let opiniones = (await Opinion.query().where({ supplier_id: params.proveedor_id }).with('quotation_data.data_request').with('data_client').with('data_supplier').fetch()).toJSON()
    let formatearFecha = opiniones.map(v => {
      return {
        ...v,
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }
  async index2 ({ request, response, params, auth }) {
    let opiniones = (await Opinion.query().where({calificado: params.proveedor_id}).fetch()).toJSON()
    var calificacion = 0
    var promedio = 0

    if (opiniones.length) {
      for (let j in opiniones) {
        calificacion = (calificacion + opiniones[j].rating_tienda)
      }

      promedio = (calificacion / opiniones.length)
    }

    response.send(promedio)
  }

  async index3 ({ request, response, params, auth }) {
    let opiniones = (await Opinion.query().where({calificado: params.cliente_id}).fetch()).toJSON()
    var calificacion = 0
    var contador = 0

    for (let j in opiniones) {
      calificacion = (calificacion + opiniones[j].rating_cliente)
      contador = contador + 1
    }

    let promedio = (calificacion / contador)

    response.send(promedio)
  }

  async masPopulares ({ params, request, response }) {
    let user = (await User.query().where({ roles: [3] }).with('quotations').fetch()).toJSON()
    for (let i = 0; i < user.length; i++) {
      let opiniones = (await Opinion.query().where({supplier_id: user[i]._id}).fetch()).toJSON()
      var calificacion = 0
      var contador = 0
      for (let j in opiniones) {
        calificacion = (calificacion + opiniones[j].rating)
        contador = contador + 1
      }
      let promedio = (calificacion / contador)
      user[i].rating_tienda = promedio
      const quotationsCompleted = user[i].quotations.filter(val => val.status === 2)
      if (quotationsCompleted.length >= 5) {
        user[i].isVerified = true
      } else {
        user[i].isVerified = false
      }
      delete user[i].quotations
    }
    user = user.filter(val => val.isVerified === true)

    let populares = user.filter(v => v.rating_tienda >= 4)
    if (!populares.length) {
      populares = user.filter(v => v.rating_tienda >= 3)
      if (!populares.length) {
        populares = user.filter(v => v.rating_tienda >= 2)
        if (!populares.length) {
          populares = user.filter(v => v.rating_tienda >= 1)
        }
      }
    }

    response.send(populares)
  }

  /**
   * Render a form to be used for creating a new opinion.
   * GET opinions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new opinion.
   * POST opinions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /* async store ({ request, response, params, auth })  {
      const user = (await auth.getUser()).toJSON()
      let body = request.only(Opiniones.fillable)
      body.cliente = params.quien === 'cliente' ? true : false
      let chat_message = await Chatmessage.find(params.chat_message_id)
      body.calificador = user._id
      body.calificado = chat_message.proveedor_id === user._id ? chat_message.cliente_id : chat_message.proveedor_id
      const opinion = await Opiniones.create(body)
      if (user.roles[0] === 2) {
        let status = await Chatmessage.query().where('_id', params.chat_message_id).update({calificado: true})
      }


      response.send(opinion)
  } */
  async store ({ request, response, params, auth })  {
      const user = (await auth.getUser()).toJSON()
      let body = request.all()
      body.client_id = user._id
      body.supplier_id = params.idSupplier
      body.quotation_id = params.id
      let requestId = (await Quotation.query().with('data_request').find(params.id)).toJSON().data_request._id
      body.request_id = requestId
      const opinion = await Opinion.create(body)
      let status = await Necesidad.query().where('_id', requestId).update({isQualified: true})
      response.send(opinion)
  }


  /**
   * Display a single opinion.
   * GET opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing opinion.
   * GET opinions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update opinion details.
   * PUT or PATCH opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a opinion with id.
   * DELETE opinions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OpinionController
