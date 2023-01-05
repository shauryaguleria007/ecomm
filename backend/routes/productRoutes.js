const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require('../controller')
const { isAuthenticated, authorizeRoles } = require('../middleware')
const router = express.Router()

router.route('/products').get(getAllProducts)
router
  .route('/product/new')
  .post(isAuthenticated, authorizeRoles('admin'), createProduct)
router
  .route('/product/:id')
  .put(isAuthenticated, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct)
  .get(getProductDetails)

module.exports = router
