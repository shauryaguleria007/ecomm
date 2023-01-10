const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { productRouter, userRouter, orderRouter } = require('./routes')
const { errorMiddleware } = require('./middleware')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', orderRouter)
app.use(errorMiddleware)
module.exports = app
