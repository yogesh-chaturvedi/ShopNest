const express = require('express')
const router = express.Router()
const { signUpValidation, logInValidation } = require('../Middlewares/AuthMiddleware')
const { signUpController } = require('../Controllers/SignUpController')
const { loginController } = require('../Controllers/LoginController')
const varifyUser = require('../Middlewares/VarifyUser')

router.post('/signup', signUpValidation, signUpController)
router.post('/login', logInValidation, loginController)


router.get('/verify', varifyUser, (req, res) => {
    res.status(200).json({
        message: "User fetch successfully", success: true, User: {
            _id: req.user._id,
            email: req.user.email,
            role: req.user.role,
            name: req.user.name
        }
    })
})


router.delete('/logout', (req, res) => {

    res.clearCookie("Token", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: "Logout successfully", success: true })
})

module.exports = router

