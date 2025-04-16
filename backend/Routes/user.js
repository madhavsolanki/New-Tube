const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user')

router.post('/signup', userController.signup)   // route to register new user
router.post('/login', userController.login)     // route to login existing user
router.post('/logout', userController.logout)   // route to logout the logged user

module.exports = router;