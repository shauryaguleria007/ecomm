const express = require('express')
const bodyParser = require('body-parser')
const { productRouter } = require('./routes')
const { errorMiddleware } = require('./middleware')

const app = express()
app.use(bodyParser.json())
app.use('/api/v1', productRouter)
app.use(errorMiddleware)
module.exports = app
