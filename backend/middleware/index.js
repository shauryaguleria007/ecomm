const errorMiddleware = require('./error')
const AsyncError = require('./asyncErrorsMiddleware')

module.exports = {
  errorMiddleware,
  AsyncError,
}
