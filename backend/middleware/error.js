const { ErrorHandler } = require('../utils')

module.exports = (err, req, res, next) => {
  err.status = err.status || 500
  err.message = err.message || 'Internal server error'

  if (err.name === 'CastError') {
    const message = `Resourse not found : ${err.path}`
    err = new ErrorHandler(message, 400)
  }
  res.status(err.status).json({ success: false, message: err.message })
}
