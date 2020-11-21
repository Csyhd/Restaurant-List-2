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

router.get('/asc', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(list => res.render('index', { list })
    )
    .catch(error => console.error(error))
})

router.get('/desc', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(list => res.render('index', { list })
    )
    .catch(error => console.error(error))
})

router.get('/category', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ category: 'asc' })
    .then(list => res.render('index', { list })
    )
    .catch(error => console.error(error))
})

router.get('/location', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ location: 'asc' })
    .then(list => res.render('index', { list })
    )
    .catch(error => console.error(error))
})

module.exports = router