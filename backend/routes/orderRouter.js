const express = require('express')
const {
  newOrder,
  singleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controller')
const { isAuthenticated, authorizeRoles } = require('../middleware')

const router = express.Router()
router.route('/order/new').post(isAuthenticated, newOrder)
router
  .route('/order/:id')
  .get(isAuthenticated, authorizeRoles('admin'), singleOrder)
router.route('/orders/my').get(isAuthenticated, myOrder)
router
  .route('/orders/all')
  .get(isAuthenticated, authorizeRoles('admin'), getAllOrders)

router
  .route('/orders/admin/:id')
  .put(isAuthenticated, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder)
module.exports = router
