const express = require('express')
const { getAllProducts, createProduct } = require('../controller')
const router = express.Router()

router.route('/products').get(getAllProducts).post(createProduct)

module.exports = router
