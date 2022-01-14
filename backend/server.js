// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
//import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) // allows  except json data form body

app.get('/', (req, res) => res.send('API is running...'))

// app.get('/api/products', (req, res) => {
//   //const newProducts = products.map((prod) => {
//   //  const { _id, name, image } = prod
//   //  return { _id, name, image }
//   //})
//   //res.json(newProducts)
//   res.json(products)
// })

// app.get('/api/products/:id', (req, res) => {
//   const product = products.find((p) => p._id == req.params.id)
//   if (!product) res.status(404).send('Product Does Not Exist')
//   res.json(product)
// })

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
