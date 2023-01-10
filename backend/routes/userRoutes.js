const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPasswordMail,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require('../controller')
const { isAuthenticated, authorizeRoles } = require('../middleware')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').put(resetPasswordMail)
router.route('/me').get(isAuthenticated, getUserDetails)
router.route('/password/update').put(isAuthenticated, updatePassword)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router
  .route('/users')
  .get(isAuthenticated, authorizeRoles('admin'), getAllUsers)

router
  .route('/user/:id')
  .get(isAuthenticated, authorizeRoles('admin'), getSingleUser)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteUser)
  .put(isAuthenticated, authorizeRoles('admin'), updateUser)

module.exports = router
