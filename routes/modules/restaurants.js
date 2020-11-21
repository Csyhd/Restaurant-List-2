const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body
  return RestaurantList.create(name)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return RestaurantList.find({ name: { $in: keyword } })
    .then(list => {
      res.render('index', { list, keyword })
    })
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((list) => {
      return res.render('show', { list })
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  return RestaurantList.findById(id)
    .then(list => {
      list.name = name
      list.category = category
      list.location = location
      list.phone = phone
      list.description = description
      return list.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router