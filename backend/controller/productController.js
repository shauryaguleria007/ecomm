const { Product } = require('../modles')
const { ErrorHandler, ApiFeatures } = require('../utils')
const { AsyncError } = require('../middleware')

//all
const getAllProducts = AsyncError(async (req, res, next) => {
  const resultPerPage = process.env.PAGE
  const productCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .searchValue()
    .filter()
    .paginate(resultPerPage)
  const products = await apiFeature.query
  res
    .status(200)
    .json({ message: true, products, count: products.length, productCount })
})

const getProductDetails = AsyncError(async (req, res, next) => {
  let productReq = await Product.findById(req.params.id)
  if (!productReq) {
    return next(new ErrorHandler('not found', 400))
  }
  res.status(200).json({
    success: true,
    productReq,
  })
})

//admin
const createProduct = AsyncError(async (req, res, next) => {
  req.body.user = req.user.id
  await Product.create(req.body)
  res.status(200).json({ message: 'product created' })
})

const updateProduct = AsyncError(async (req, res, next) => {
  let productReq = await Product.findById(req.params.id)
  if (!productReq) {
    return next(new ErrorHandler('not found', 400))
  }
  productReq = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({ success: true })
})

const deleteProduct = AsyncError(async (req, res, next) => {
  let productReq = await Product.findById(req.params.id)
  if (!productReq) {
    return next(new ErrorHandler('not found', 400))
  }
  productReq = await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({ success: true })
})
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
}
