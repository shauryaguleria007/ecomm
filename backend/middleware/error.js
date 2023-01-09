const { ErrorHandler } = require('../utils')

module.exports = (err, req, res, next) => {
  err.status = err.status || 500
  err.message = err.message || 'Internal server error'

  if (err.name === 'CastError') {
    const message = `Resourse not found : ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  if (err.name === 'JsonWebTokenError') {
    const message = `jwt is invalid `
    err = new ErrorHandler(message, 400)
  }
  if (err.name === 'TokenExpireError') {
    const message = `jwt has expired`
    err = new ErrorHandler(message, 400)
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)}`
    err = new ErrorHandler(message, 400)
  }
  res.status(err.status).json({ success: false, message: err.message })
}
