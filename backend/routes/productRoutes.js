const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
  getAllReviews,
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

router
  .route('/review')
  .put(isAuthenticated, createProductReview)
  .get(getAllReviews)
  .delete(isAuthenticated, deleteReview)

module.exports = router
