'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with favoritos
 */
const Favoritos = use("App/Models/Favorito")
class FavoritoController {
  /**
   * Show a list of all favoritos.
   * GET favoritos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, auth, params }) {
    const user_id = ((await auth.getUser()).toJSON())._id
    let favorito = (await Favoritos.query().where({ id_tienda: params.id_proveedor, id_cliente: user_id }).first())
    response.send(favorito)
  }

  /**
   * Render a form to be used for creating a new favorito.
   * GET favoritos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth, params }) {
    let body = request.all()
    const user_id = ((await auth.getUser()).toJSON())._id
    let exist = (await Favoritos.query().where({ id_tienda: params.id_proveedor, id_cliente: user_id }).fetch()).toJSON()
    if (exist.length) {
      let update = await Favoritos.query().where({ id_tienda: params.id_proveedor, id_cliente: user_id }).update({favorito: body.favorito})
    } else {
      body.id_tienda = params.id_proveedor
      body.id_cliente = user_id
      let crear = (await Favoritos.create(body)).toJSON()
    }
    response.send(body)
  }

  /**
   * Create/save a new favorito.
   * POST favoritos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single favorito.
   * GET favoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    const user_id = ((await auth.getUser()).toJSON())._id
    let favoritos = (await Favoritos.query().where({ id_cliente: user_id, favorito: true }).with('datos_tienda').fetch()).toJSON()
    response.send(favoritos)
  }

  /**
   * Render a form to update an existing favorito.
   * GET favoritos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update favorito details.
   * PUT or PATCH favoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a favorito with id.
   * DELETE favoritos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FavoritoController
