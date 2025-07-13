const express = require('express')
const router = express.Router()
const { signUpValidation, logInValidation } = require('../Middlewares/AuthMiddleware')
const { signUpController } = require('../Controllers/SignUpController')
const { loginController } = require('../Controllers/LoginController')

router.post('/signup', signUpValidation, signUpController)
router.post('/login', logInValidation, loginController)

module.exports = router

