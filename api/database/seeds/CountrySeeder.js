'use strict'
var ObjectId = require('mongodb').ObjectId;

/*
|--------------------------------------------------------------------------
| CountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Country = use("App/Models/Country")
const countryData = [
  {
    _id: new ObjectId('60912d97556b217e7c8a0d62'),
    name: 'Chile',
  },
  {
    _id: new ObjectId('60912d98556b217e7c8a0d64'),
    name: 'Argentina',
  }

]

class CountrySeeder {
  async run () {
    for (let i in countryData) {
      let country = await Country.findBy('_id', countryData[i].id)
      if (!country) {
        await Country.create(countryData[i])
      } else {
        country.name = countryData[i].name
        country.ubicacion = countryData[i].ubicacion
        await country.save()
      }
    }
    console.log('Finished Country')
  }
}

module.exports = CountrySeeder
