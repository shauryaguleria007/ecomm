const AsyncError = require('./asyncErrorsMiddleware')
const { ErrorHandler } = require('../utils')
const jwt = require('jsonwebtoken')
const { User } = require('../modles')
const isAuthenticated = AsyncError(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) return next(new ErrorHandler('not authenticated', 401))
  const decodedData = jwt.verify(token, process.env.JWT_SECERET)
  req.user = await User.findById(decodedData.id)
  next()
})

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new ErrorHandler('not authorized', 401))
    next()
  }
}

module.exports = { isAuthenticated, authorizeRoles }
