const errorMiddleware = require('./error')
const AsyncError = require('./asyncErrorsMiddleware')
const auth = require('./auth')

module.exports = {
  errorMiddleware,
  AsyncError,
  ...auth,
}
