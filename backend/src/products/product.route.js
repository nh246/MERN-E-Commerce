const express = require('express')

const  verifyToken  = require('../middleware/varifyToken')
const verifyAdmin = require('../middleware/varifyAdmin')

const { createNewProduct, getAllProducts } = require('./product.controller')
const router = express.Router()

// Create a product ( only admin)

router.post("/create-product",verifyToken, verifyAdmin,  createNewProduct)

// get all products

router.get("/", getAllProducts)


module.exports = router