const express= require('express')
const { makePaymentRequest } = require('./order.controller')

const router = express.Router()

// create checkout session
router.post("/create-checkout-session", makePaymentRequest)

module.exports = router