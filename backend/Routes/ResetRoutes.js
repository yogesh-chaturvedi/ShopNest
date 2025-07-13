const express = require('express')
const router = express.Router()
const UserModel = require("../Models/User")
const { resetValidation } = require("../Middlewares/AuthMiddleware")
const bcrypt = require('bcrypt');

// reset pass
router.post('/reset', resetValidation, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        else {
            // console.log(password)
            const hashedPassword = await bcrypt.hash(password, 10);
            // console.log(hashedPassword)
            user.password = hashedPassword;
            await user.save()
            return res.status(200).json({ message: 'Reset Successfull', success: true })
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'something went wrong', success: false, error })
    }

})


module.exports = router
