const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User')


const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET_KEY);

                // setting token in cookie 
                res.cookie('Token', token, {
                    httpOnly: true,
                    secure: true,    // true--> for production 
                    sameSite: 'none',  // none --> for production
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                return res.status(200).json({ message: "Login Successfully", success: true })
            }
            else {
                return res.status(400).json({ message: "wrong password", success: false })
            }
        }
        else {
            return res.status(400).json({ message: "userNot found you need to signUp first", success: false })
        }

    }
    catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
}



module.exports = { loginController }