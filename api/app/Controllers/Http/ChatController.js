'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with chats
 */
const Chat = use("App/Models/Chat")
const ChatMessage = use("App/Models/ChatMessage")
const Necesidad = use("App/Models/Necesidad")
const User = use("App/Models/User")
const moment = require('moment')
class ChatController {
  /**
   * Show a list of all chats.
   * GET chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new chat.
   * GET chats/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new chat.
   * POST chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    const user_id = ((await auth.getUser()).toJSON())._id
    let body = request.only(['message'])
    body.user_id = user_id
    body.quotation_id = params.id
    body.viewed = false
    let message = (await Chat.create(body)).toJSON()
    let chat = await ChatMessage.query().where('_id', params.id).update({last_message: message.message, created_at_message: message.created_at})
    response.send(message)
  }

  async storeChat ({ request, response, params, auth }) {
    let body = request.all()
    var chatM = (await ChatMessage.query().where({ necesidad_id: params.id_cotisation, proveedor_id: body.proveedor_id }).fetch()).toJSON()
    let cotisation = {}
    if (!chatM.length) {
      body.necesidad_id = params.id_cotisation
      body.status = 'Pendiente'
      cotisation = await ChatMessage.create(body)
    } else {
      cotisation = chatM[0]
    }
    response.send(cotisation)
  }

  /**
   * Display a single chat.
   * GET chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showAllChats ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let rol = user.roles[0]
    let cotizaciones = []
    if (rol === 2) {
      cotizaciones = (await ChatMessage.query().where('cliente_id',user._id).with('datos_proveedor').with('necesidad_info').fetch()).toJSON()
    } else {
      cotizaciones = (await ChatMessage.query().where('proveedor_id',user._id).with('datos_cliente').with('necesidad_info').fetch()).toJSON()
    }
    for (let i = 0; i < cotizaciones.length; i++) {
      if (cotizaciones[i].created_at_message) {
        cotizaciones[i].created_at_message = moment(cotizaciones[i].created_at_message).lang('es').calendar()
      }

    }
    response.send(cotizaciones)
  }

  async showAllMessages ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const id_user = user._id
    let cotisation = (await ChatMessage.query().where('_id',params.id_cotisation).with('necesidad_info').fetch()).toJSON()
    let send = {
      datos_proveedor: cotisation[0].proveedor_id,
      datos_cliente: cotisation[0].cliente_id,
      messages: [],
      status: cotisation[0].status,
      id_cotization: cotisation[0]._id,
      nombre_necesidad: cotisation[0].necesidad_info.name
    }
    let messages = (await Chat.where({cotisazion_id: params.id_cotisation}).with('datos_user').fetch()).toJSON()
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

  async showAllCotizations ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotizaciones = []
    let today = moment().format('YYYY/MM/DD')
    if (user.roles[0] === 2) {
      cotizaciones = (await ChatMessage.query().where({cliente_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Rechazado' }, { status: 'Iniciado' }, { status: 'Terminado' }, { status: 'Atrasado' }]}).with('datos_proveedor').fetch()).toJSON()
    } else {
      cotizaciones = (await ChatMessage.query().where({proveedor_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Rechazado' }, { status: 'Iniciado' }, { status: 'Terminado' }, { status: 'Atrasado' }]}).with('datos_cliente').fetch()).toJSON()
    }
    for (let i = 0; i < cotizaciones.length; i++) {
      let dat = (await Necesidad.query().where({_id: cotizaciones[i].necesidad_id}).fetch()).toJSON()
      cotizaciones[i].datos_necesidad = dat[0]
      if (cotizaciones[i].fecha_termino && today > cotizaciones[i].fecha_termino && cotizaciones[i].status !== 'Terminado') {
        let updat = await ChatMessage.query().where('_id', cotizaciones[i]._id).update({status: 'Atrasado'})
      }
    }
    let formatearFecha = cotizaciones.map(v => {
      return {
        ...v,
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }

  async showAllCotizations3 ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotizaciones = []
    let today = moment().format('YYYY/MM/DD')
    if (user.roles[0] === 2) {
      cotizaciones = (await ChatMessage.query().where({cliente_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Iniciado' }, { status: 'Atrasado' }]}).with('datos_proveedor').with('necesidad_info').with('categorianame').fetch()).toJSON()
    } else {
      cotizaciones = (await ChatMessage.query().where({proveedor_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Iniciado' }, { status: 'Atrasado' }]}).with('datos_cliente').with('necesidad_info').with('categorianame').fetch()).toJSON()
    }
    for (let i = 0; i < cotizaciones.length; i++) {
      let dat = (await Necesidad.query().where({_id: cotizaciones[i].necesidad_id}).fetch()).toJSON()
      cotizaciones[i].datos_necesidad = dat[0]
      if (cotizaciones[i].fecha_termino && today > cotizaciones[i].fecha_termino && cotizaciones[i].status !== 'Terminado') {
        let updat = await ChatMessage.query().where('_id', cotizaciones[i]._id).update({status: 'Atrasado'})
      }
    }
    let formatearFecha = cotizaciones.map(v => {
      return {
        ...v,
        colorRadio: v.necesidad_info.necesidad === 'Express (Permite recibir cotizaciones hasta 3 horas)' ? 'red' : 'blue',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }

  async showAllCotizations2 ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotizaciones = []
    let today = moment().format('YYYY/MM/DD')
    if (user.roles[0] === 2) {
      cotizaciones = (await ChatMessage.query().where({cliente_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Iniciado' }, { status: 'Atrasado' }]}).with('datos_proveedor').with('necesidad_info').with('categorianame').fetch()).toJSON()
    } else {
      cotizaciones = (await ChatMessage.query().where({proveedor_id: user._id, $or: [{ status: 'Cotizado' }, { status: 'Aprobado' }, { status: 'Iniciado' }, { status: 'Atrasado' }]}).with('datos_cliente').with('necesidad_info').with('categorianame').fetch()).toJSON()
    }
    for (let i = 0; i < cotizaciones.length; i++) {
      let dat = (await Necesidad.query().where({_id: cotizaciones[i].necesidad_id}).fetch()).toJSON()
      cotizaciones[i].datos_necesidad = dat[0]
      if (cotizaciones[i].fecha_termino && today > cotizaciones[i].fecha_termino && cotizaciones[i].status !== 'Terminado') {
        let updat = await ChatMessage.query().where('_id', cotizaciones[i]._id).update({status: 'Atrasado'})
      }
    }
    let formatearFecha = cotizaciones.map(v => {
      return {
        ...v,
        ...v.necesidad_info,
        colorRadio: v.necesidad_info.necesidad === 'Express (Permite recibir cotizaciones hasta 3 horas)' ? 'red' : 'blue',
        fechaCreacion: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(formatearFecha)
  }

  async cotizationById ({ response, params }) {
    let datos = (await ChatMessage.query().where({_id: params.id_cotisation}).fetch()).toJSON()
    response.send(datos[0])
  }

  /**
   * Render a form to update an existing chat.
   * GET chats/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update chat details.
   * PUT or PATCH chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateCotization ({ params, request, response }) {
    var dat = request.all()
    var stu = dat.status
    delete dat.status
    let cotization = await ChatMessage.query().where('_id', params.id_cotisation).update({cotizacion: dat, status: stu})
    response.send(cotization)
  }

  async updateStatus ({ params, request, response }) {
    var dat = request.all()
    let cotization = []
    if (dat.status === 'Aprobado') {
      let cot = await ChatMessage.query().where('_id', params.id_cotisation).first()
      let otherNeed = await ChatMessage.query().where('necesidad_id', cot.necesidad_id).update({status: 'Rechazado'})
      cotization = await ChatMessage.query().where('_id', params.id_cotisation).update({status: dat.status})
      let necesidad = await Necesidad.query().where({_id: cot.necesidad_id}).update({cotizado: true})
    } else {
      cotization = await ChatMessage.query().where('_id', params.id_cotisation).update({status: dat.status, motivo: dat.motivo})
    }
    response.send(cotization)
  }

  async updateFechaTermino ({ params, request, response }) {
    var dat = request.all()
    let cotization = await ChatMessage.query().where('_id', params.id_cotisation).update({fecha_termino: dat.fecha_termino, status: 'Iniciado'})
    response.send(cotization)
  }

  /**
   * Delete a chat with id.
   * DELETE chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let eliminar = await ChatMessage.find(params.id)
    eliminar.delete()
    response.send(eliminar)
  }
}

module.exports = ChatController
