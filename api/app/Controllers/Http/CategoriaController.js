'use strict'

const Categoria = use("App/Models/Categoria")
const { validate } = use("Validator")
var ObjectId = require('mongodb').ObjectId;


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CategoriaController {
  async index ({ request, response, view }) {
    let datos = await Categoria.all()
    response.send(datos)
  }
  async categoryById ({ params, response }) {
    const id = new ObjectId(params.id)
    let data = (await Categoria.query().find(id)).toJSON()
    response.send(data)
  }

}


module.exports = CategoriaController
