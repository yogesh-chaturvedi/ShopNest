const express = require('express')
const bcrypt = require('bcrypt');
const UserModel = require('../Models/User')


const signUpController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new UserModel({ name, email, password: hashedPassword })
            await user.save()
            return res.status(200).json({ message: "Account is created", success: true })
        }
        else {
            return res.status(400).json({ message: "already have an account you can login", success: false })
        }

    }
    catch (error) {
        return res.status(400).json({ message: "something went wront", success: false })
    }
}



module.exports = { signUpController }