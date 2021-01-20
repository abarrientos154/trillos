'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  datos_user () {
    return this.hasOne('App/Models/User', 'user_id', '_id')
  }
}

module.exports = Chat
