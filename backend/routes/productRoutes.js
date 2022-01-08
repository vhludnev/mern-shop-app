import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public (Fetch all products)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //const newProducts = products.map((prod) => {
    //  const { _id, name, image } = prod
    //  return { _id, name, image }
    //})
    //res.json(newProducts)
    //res.json(products)
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //const product = products.find((p) => p._id == req.params.id)
    //if (!product) res.status(404).send('Product Does Not Exist')
    //res.json(product)
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      //res.status(404).json({ message: 'Product does not exist' })
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
