const { Order, Product } = require('../modles')

const { AsyncError } = require('../middleware')
const { ErrorHnadler, ErrorHandler } = require('../utils')

const newOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  })

  res.json({
    success: true,
  })
})

const singleOrder = AsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (!order) return next(new ErrorHandler('no orders found ', 400))
  res.json({
    success: true,
    order,
  })
})

const myOrder = AsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id })
  if (!order) return next(new ErrorHandler('no orders found ', 400))
  res.status(200).json({ success: true, order })
})

const getAllOrders = AsyncError(async (req, res, next) => {
  const order = await Order.find()
  if (!order) return next(new ErrorHandler('no orders found ', 400))
  let totalAmount = 0
  order.forEach((ord) => {
    totalAmount += ord.totalPrice
  })
  res.json({
    success: true,
    order,
    totalAmount,
  })
})

const updateOrder = AsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) return next(new ErrorHandler('no orders found ', 400))
  if (order.orderStatus === 'delivered')
    return next(new ErrorHandler('order is already delivered', 400))

  if (req.body.status === 'shipped')
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity)
    })

  order.orderStatus = req.body.status

  if (req.body.status === 'delivered') {
    order.deliveredAt = Date.now()
  }
  await order.save({
    validateBeforeSave: false,
  })
  res.status(200).json({
    success: true,
  })
})
const updateStock = async (id, quantity) => {
  const product = await Product.findById(id)
  product.stock = product.stock - quantity
  await product.save({
    validateBeforeSave: false,
  })
}

const deleteOrder = AsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) return next(new ErrorHandler('no orders found ', 400))
  await order.remove()
  res.json({
    success: true,
  })
})

module.exports = {
  newOrder,
  singleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
}
