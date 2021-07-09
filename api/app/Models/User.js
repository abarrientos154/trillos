'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get objectIDs () {
    return ["country", "city"];
  }
  static get fillable() {
    return ['run_dni', 'country', 'observaciones', 'region', 'email', 'ciudad', 'full_name', 'fecha', 'Dni', 'name', 'last_name', 'cambioClave', 'cambioSoloClave', 'password', 'phone', 'plan_id', 'roles', 'direccion', 'hora_inicio', 'hora_fin', 'dias', 'delivery', 'categorias', 'birthdate', ' city']
  }
  static fieldValidationRules() {
    const rulesUser = {
      run_dni: 'string',
      Dni: 'string',
      observaciones: 'string',
      email: 'required|email',
      full_name: 'string',
      name: 'string',
      last_name: 'string',
      password:'required|string',
      phone: 'string',
      plan_id: 'string',
      roles: 'number',
      direccion: 'string',
      hora_inicio: 'string',
      hora_fin: 'string',
      dias: 'array',
      categorias: 'array',
    }
    return rulesUser
  }
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  // static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
