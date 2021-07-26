'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Opinion extends Model {
  static get fillable() {
    return ['comentario', 'rating_tienda', 'necesidad_id', 'rating_cliente']
  }
  static fieldValidationRules() {
    const rules = {
      comentario: "string",
      rating_tienda: "number",
      rating_cliente: "string"
        }
    return rules
  }
  user_info () {
    return this.hasOne('App/Models/User', 'user_id', '_id')
  }
  data_supplier () {
    return this.hasOne('App/Models/User', 'supplier_id', '_id')
  }
  data_client () {
    return this.hasOne('App/Models/User', 'client_id', '_id')
  }
  creador () {
    return this.hasOne('App/Models/User', 'ownerId', '_id')
  }
  necesidad_info () {
    return this.hasOne('App/Models/Necesidad', 'necesidad_id', '_id')
  }
  quotation_data () {
    return this.hasOne('App/Models/Quotation', 'quotation_id', '_id')
  }
}

module.exports = Opinion
