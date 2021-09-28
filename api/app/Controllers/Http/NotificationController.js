'use strict'
const Notification = use('App/Models/Notification')
const ObjectId = require('mongodb').ObjectId
const moment = require('moment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
  /**
   * Show a list of all notifications.
   * GET notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth }) {
    let user = (await auth.getUser()).toJSON()
    const id = new ObjectId(user._id)
    let data = (await Notification.query().where({ user_id: id }).fetch()).toJSON()
    data = data.map(v => {
      return {
        ...v,
        created_at: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(data)
  }

  async disableNotifyById ({ response, params }) {
    let id = new ObjectId(params.id)
    let updateNotification = Notification.query().where({ _id: id }).update({ status: false })
    response.send(updateNotification)
  }

  async disableAllNotifyByUser ({ response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let id = new ObjectId(user._id)
    let notifications = (await Notification.query().where({ user_id: id }).fetch()).toJSON()
    for (const i in notifications) {
      let updateNotification = Notification.query().where({ _id: notifications[i]._id }).update({ status: false })
    }
    response.send(true)
  }

  /**
   * Render a form to be used for creating a new notification.
   * GET notifications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new notification.
   * POST notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single notification.
   * GET notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing notification.
   * GET notifications/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update notification details.
   * PUT or PATCH notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NotificationController
