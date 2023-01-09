const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPasswordMail,
} = require('../controller')
const { isAuthenticated } = require('../middleware')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticated, logoutUser)
router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').put(resetPasswordMail)

module.exports = router
