const express = require('express')
const bodyParser = require('body-parser')
const { productRouter, userRouter } = require('./routes')
const { errorMiddleware } = require('./middleware')

const app = express()
app.use(bodyParser.json())
app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use(errorMiddleware)
module.exports = app
