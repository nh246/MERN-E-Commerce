const express = require("express");
const { userRegistration, userLoggedIn, userLogout } = require("./user.controller");

const router = express.Router();


// register endpoint 

router.post("/register", userRegistration);

// login routes 

router.post('/login', userLoggedIn)

router.post('/logout', userLogout)

module.exports = router;
