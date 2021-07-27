'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Necesidad extends Model {
  static get fillable() {
    return ['categoria_id','direccion','necesidad','descripcion', 'status']
  }
  static fieldValidationRules() {
    const rules = {
      categoria_id: "string",
      necesidad: "required|string",
      descripcion: "required|string",
      direccion: "string"
    }
    return rules
  }
  creador () {
    return this.hasOne('App/Models/User', 'ownerId', '_id')
  }
  categorianame () {
    return this.hasOne('App/Models/Categoria', 'categoria_id', '_id')
  }
  chat_info () {
    return this.belongsTo('App/Models/ChatMessage', '_id', 'necesidad_id')
  }
  data_opinion () {
    return this.hasOne('App/Models/Opinion', '_id', 'request_id')
  }
}

module.exports = Necesidad
