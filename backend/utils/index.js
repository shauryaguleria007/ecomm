const ErrorHandler = require('./errorHandler')
const ApiFeatures = require('./apiFeatures')
const sendToken = require('./jwt')
const nodeMailer = require('./nodeMailer')
module.exports = {
  ErrorHandler,
  ApiFeatures,
  sendToken,
  ...nodeMailer,
}
