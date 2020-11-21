const mongoose = (require('mongoose'))
const db = mongoose.connection
mongoose.connect('mongodb://localhost/restaurant_2_0', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db