const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
    maxLength: [30, 'length cannot exede 30 '],
    minLength: [4, 'name should have more than 4 '],
    unique: [true, 'name already used'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    validate: [validator.isEmail, 'please enter a valid email'],
    unique: [true, 'email already used'],
  },
  password: {
    type: String,
    required: [true, 'please enter password '],
    minLength: [8, 'password should have greater than 8 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECERET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
  const res = await bcrypt.compare(enteredPassword, this.password)
  return res
}
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken
}

module.exports = mongoose.model('User', userSchema)
