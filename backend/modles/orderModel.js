const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paiedAt: {
      type: Date,
      required: true,
      required: true,
    },
    itemPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'processing',
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: String,
      default: Date.now(),
    },
  },
})

module.exports = mongoose.model('Order', orderSchema)
