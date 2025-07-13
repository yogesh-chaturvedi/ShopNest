const Joi = require('joi');


const signUpValidation = (req, res, next) => {
    const { name, email, password } = req.body
    const schema = Joi.object({
        name: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(12).required(),
    })
    const { error } = schema.validate({ name, email, password })
    if (error) {
        return res.status(400).json({ message: "there is an validation error", error })
    }
    next()
}


const logInValidation = (req, res, next) => {
    const { email, password } = req.body
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(12).required(),
    })

    const { error } = schema.validate({ email, password })
    if (error) {
        return res.status(400).json({ message: 'validation error', success: false, error })
    }
    next()
}


const resetValidation = (req, res, next) => {
    const { password } = req.body;
    const schema = Joi.object({
        password: Joi.string().min(5).max(12).required(),
    })
    const { error } = schema.validate({password})
    if (error) {
        return res.status(400).json({ message: 'validation error', success: false, error })
    }
    next()
}

module.exports = { signUpValidation, logInValidation, resetValidation }