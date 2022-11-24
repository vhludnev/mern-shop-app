// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
//import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(cors({ 
  origin: ["http://localhost:3000", process.env.FRONT_URL], 
  credentials: true 
}))

app.use(express.json()) // allows  except json data form body
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // makes 'upload' folder static on server

if (process.env.NODE_ENV === 'production') {
  app.use(compression())

  // app.use(express.static(path.join(__dirname, '/frontend/build'))) // setting 'build' folder as static

  // app.get(
  //   '*',
  //   (req, res) =>
  //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')) // any routes, besides those in app.use above, point to index.html
  // )

} else {
  app.get('/', (req, res) => res.send('API is running....'))
}

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
