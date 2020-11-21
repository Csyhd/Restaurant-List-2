const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = (require('mongoose'))
const bodyParser = require('body-parser')
const RestaurantList = require('./models/restaurantList')
const app = express()
const port = 3000
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant_2_0', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(list => res.render('index', { list }))
    .catch(error => console.error(error))
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

// app.get('/restaurants/:restaurants_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => {
//     return restaurant.id.toString() === req.params.restaurants_id
//   })
//   res.render('show', { restaurant: restaurant })
// })

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body
  console.log(name)
  return RestaurantList.create(name)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((list) => {
      return res.render('show', { list })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('start')
})