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
  const user = await User.findOne({ email }).select('+password')
  if (!user) return next(new ErrorHandler('please register '), 400)
  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched)
    return next(new ErrorHandler('incorrect password', 401))
  const user2 = await User.findOne({ email })

  sendToken(user2, 200, res)
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

const getUserDetails = AsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(['+password'])
  res.status(200).json({ success: true, user })
})

const updatePassword = AsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id).select('+password')
  const passwordMatch = await user.comparePassword(req.body.password)
  console.log(passwordMatch)
  if (!passwordMatch)
    return next(new ErrorHandler('please enter correct password', 400))
  if (req.body.newPassword !== req.body.confirmNewPassword)
    return next(
      new ErrorHandler('new password is not same as confirmed password ', 400)
    )
  user.password = req.body.newPassword
  user = await User.findById(req.user.id)
  await user.save()

  sendToken(user, 200, res)
})

const updateProfile = AsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.json({
    success: true,
  })
})

const getAllUsers = AsyncError(async (req, res, next) => {
  const users = await User.find({ role: { $ne: 'admin' } })
  res.send({ success: true, users })
})

const getSingleUser = AsyncError(async (req, res, next) => {
  const user = await User.findById({
    _id: req.params.id,
    role: { $ne: 'admin' },
  })
  if (!user) return next(new ErrorHandler('user not found'))
  res.send({ success: true, user })
})

const deleteUser = AsyncError(async (req, res, next) => {
  const user = await User.findByIdAndRemove({
    _id: req.params.id,
    role: { $ne: 'admin' },
  })
  if (!user) return next(new ErrorHandler('user not found'))
  await user.remove()
  res.send({ success: true })
})

const updateUser = AsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  const user = await User.findByIdAndUpdate(
    {
      _id: req.params.id,
      role: { $ne: 'admin' },
    },
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  if (!user) return next(new ErrorHandler('user not found'))
  user.save()
  res.send({ success: true })
})
module.exports = {
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
}
