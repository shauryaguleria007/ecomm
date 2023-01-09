const { User } = require('../modles')
const { ErrorHandler, sendEmail, sendToken } = require('../utils')
const { AsyncError } = require('../middleware')
const crypto = require('crypto')
const { send } = require('process')

const registerUser = AsyncError(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'public_id',
      url: 'url',
    },
  })

  sendToken(user, 200, res)
})

const loginUser = AsyncError(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password)
    return next(new ErrorHandler('email and password required ', 400))
  const user = await User.findOne({ email })
  if (!user) return next(new ErrorHandler('please register '), 400)
  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched)
    return next(new ErrorHandler('incorrect password', 401))

  sendToken(user, 200, res)
})

const logoutUser = AsyncError(async (req, res, next) => {
  res
    .cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true })
})

const forgotPassword = AsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) return next(new ErrorHandler('invalid email', 400))

  // get reset password token

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  //create url

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset token is :-\n ${resetPasswordUrl} \nIf you have not requested this email then, ignore it `
  // send mail
  try {
    await sendEmail({
      email: user.email,
      message,
      subject: 'password recovery',
    })
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message, 500))
  }
})

const resetPasswordMail = AsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user)
    return next(new ErrorHandler('time limit exeded please try again'), 400)

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('password doesnot match'), 400)
  }

  user.password = req.body.password
  user.resetPasswordExpire = undefined
  user.resetPasswordToken = undefined
  await user.save()

  sendToken(user, 200, res)
})
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPasswordMail,
}
