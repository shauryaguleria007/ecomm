const { User } = require('../modles')
const { ErrorHandler, ApiFeatures, sendToken } = require('../utils')
const { AsyncError } = require('../middleware')

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
module.exports = {
  registerUser,
  loginUser,
}
