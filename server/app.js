const express = require('express')
const app = express()
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDb:', error.message)
  })

app.use(express.static('build'))

app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('*', (req, res) => {
  res.sendFile('/build/index.html');
});

module.exports = app