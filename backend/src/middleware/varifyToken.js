const { errorResponse, successResponse } = require("../utilis/responseHandler");

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_KEY
const varifyToken = (req, res, next)=> {
 try {
    const token = req.cookies.token  // TODO: uncomment this when done
    // const token = req.headers.authorization?.split(' ')[1]
    // console.log("Token from cookies", token)

    if(!token){
        return successResponse(res, 401, "Unauthorized access")
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // console.log(decoded)

    if(!decoded){
        return res.status(403).send({ message: "Access denied"})
    }

    req.userId = decoded.userId
    req.role = decoded.role
    next()

 } catch (error) {
    errorResponse(res, 500, "Invalid Token", error);
 }
}

module.exports = varifyToken