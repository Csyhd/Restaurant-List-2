const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  }
  // id: Number,
  // name: String,
  // name_en: String,
  // category: String,
  // image: String,
  // location: String,
  // phone: String,
  // google_map: String,
  // rating: Number,
  // description: String
})

module.exports = mongoose.model('RestaurantList', restaurantSchema)