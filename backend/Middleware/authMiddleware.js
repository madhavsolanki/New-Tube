const jwt = require('jsonwebtoken')
const user = require('../Models/user')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY
// middleware to authenticate user using JWT
const auth = async (req, res, next) => {
    const token = req.cookies.token;

    // checks if token exists
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: "No token found"
        })
    }else{
        try{
            const decoded = jwt.verify(token, secretKey);

            // retrieves user details from database excluding password
            req.user = await user.findById(decoded.userId).select('-password');
            next();
        }
        catch(err){
            res.status(500).json({
                success: false,
                msg: err.message
            })
        }   
    }
}
module.exports = auth;