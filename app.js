const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = (require('mongoose'))
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

mongoose.connect('mongodb://localhost/restaurant_2_0', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.listen(port, () => {
  console.log('start')
})