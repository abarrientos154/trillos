'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Quotation extends Model {
  data_client () {
    return this.hasOne('App/Models/User', 'client_id', '_id')
  }
  data_supplier () {
    return this.hasOne('App/Models/User', 'supplier_id', '_id')
  }
  data_request () {
    return this.hasOne('App/Models/Necesidad', 'request_id', '_id')
  }
  lastMessage () {
    return this.hasOne('App/Models/Chat', 'last_message_id', '_id')
  }
  opinion () {
    return this.hasOne('App/Models/Opinion', '_id', 'quotation_id')
  }
  /* categoryName () {
    return this.hasOne('App/Models/Categoria', 'categoria_id', '_id')
  } */
}

module.exports = Quotation
