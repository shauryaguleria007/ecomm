const { Product } = require('../modles')

const createProduct = (req, res) => {
  console.log(req)
  res.status(200).json({ message: 'product created' })
}

const getAllProducts = (req, res) => {
  res.status(200).json({ message: 'working' })
}

module.exports = {
  createProduct,
  getAllProducts,
}
