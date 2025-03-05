const express = require('express')
const { createNewProduct } = require('./product.controller')
const router = express.Router()

// Create a product

router.post("/create-product", createNewProduct)

module.exports = router