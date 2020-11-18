const mongoose = require('mongoose')
const RestaurantList = require('../restaurantList')
const restaurantList = require('/Users/darylchou/AlphaCamp/restaurant_2_0/restaurant.json')
mongoose.connect('mongodb://localhost/restaurant_2_0', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.results.forEach((name) => {
    RestaurantList.create(name)
  })
  console.log('done')
})

