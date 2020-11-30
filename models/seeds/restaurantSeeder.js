const db = require('../../config/mongoose')
const RestaurantList = require('../restaurantList')
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  restaurantList.results.forEach((name) => {
    RestaurantList.create(name)
  })
  console.log('done')
})

