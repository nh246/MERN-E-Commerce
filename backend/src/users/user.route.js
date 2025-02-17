const express = require("express");
const { userRegistration, userLoggedIn, userLogout, getAllUsers } = require("./user.controller");
const varifyToken = require("../middleware/varifyToken");

const router = express.Router();


// register endpoint 

router.post("/register", userRegistration);

// login routes 

router.post('/login', userLoggedIn)

// Logout routes

router.post('/logout', userLogout)

// get all users endpoints (token varify and admin)

router.get('/users', varifyToken, getAllUsers)



module.exports = router;
