const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')

router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(list => res.render('index', { list })
    )
    .catch(error => console.error(error))
})

module.exports = router