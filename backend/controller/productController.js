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

const createProductReview = AsyncError(async (req, res, next) => {
  const { rating, comment } = req.body
  const productId = req.query.id
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }
  const product = await Product.findById(productId)
  if (!product) return next(new ErrorHandler('product not found', 400))
  const isReviewed = product.review.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  )
  if (isReviewed) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating
        rev.comment = comment
      }
    })
  } else {
    product.review.push(review)
    product.numOfReviews = product.review.length
  }
  let avg = 0
  product.ratings = product.review.forEach((rev) => {
    avg += rev.rating
  })
  product.ratings = avg / product.review.length
  await product.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
  })
})

const getAllReviews = AsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  console.log(req.query.id)
  if (!product) return next(new ErrorHandler('product not found', 400))
  console.log(product.name)
  res.status(200).json({
    success: true,
    reviews: product.review,
  })
})

const deleteReview = AsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)
  if (!product) return next(new ErrorHandler('product not found', 400))

  const review = product.review.filter(
    (rev) => rev.user.toString() !== req.user.id.toString()
  )
  const numOfReviews = review.length
  let ratings = 0
  if (numOfReviews === 0) ratings = 0
  else {
    let avg = 0
    review.forEach((rev) => {
      avg += rev.rating
    })
    ratings = avg / review.length
  }
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      review,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.json({
    success: true,
  })
})

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
}
