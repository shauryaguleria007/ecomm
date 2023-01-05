const errorMiddleware = require('./error')
const AsyncError = require('./asyncErrorsMiddleware')
const isAuthenticated = require('./asyncErrorsMiddleware')

module.exports = {
  errorMiddleware,
  AsyncError,
  isAuthenticated,
}
