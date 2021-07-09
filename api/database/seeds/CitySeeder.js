'use strict'
var ObjectId = require('mongodb').ObjectId;
/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const City = use("App/Models/City")
const cityData = [
  {
    id: 1,
    country_id: new ObjectId('60912d98556b217e7c8a0d64'),
    name: 'ciudad argentina 1'
  },
  {
    id: 2,
    country_id: new ObjectId('60912d98556b217e7c8a0d64'),
    name: 'ciudad argentina 2'
  },
  {
    id: 3,
    country_id: new ObjectId('60912d97556b217e7c8a0d62'),
    name: 'ciudad chile 1'
  },
  {
    id: 4,
    country_id: new ObjectId('60912d97556b217e7c8a0d62'),
    name: 'ciudad chile 2'
  }
]

class CitySeeder {
  async run () {
    for (let i in cityData) {
      let city = await City.findBy('id', cityData[i].id)
      if (!city) {
        await City.create(cityData[i])
      } else {
        city.pais_id = cityData[i].pais_id
        city.name = cityData[i].name
        await city.save()
      }
    }
    console.log('Finished City')
  }
}

module.exports = CitySeeder
