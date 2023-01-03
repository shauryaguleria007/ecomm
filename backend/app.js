const express = require('express')
const { productRouter } = require('./routes')

const app = express()
app.use('/api/v1', productRouter)

module.exports = app
