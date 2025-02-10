const express = require("express");
const { userRegistration, userLoggedIn } = require("./user.controller");

const router = express.Router();


// register endpoint 

router.post("/register", userRegistration);

// login routes 

router.post('/login', userLoggedIn)

module.exports = router;
