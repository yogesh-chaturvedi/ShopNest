const express = require('express')
const router = express.Router()
const VarifyUser = require('../Middlewares/VarifyUser')
const UserModel = require('../Models/User')
const UserOrders = require('../Models/Orders')


//  to save orders in db
router.post('/save', VarifyUser, async (req, res) => {
    console.log('inside order route')
    const { userDetails, cartItems, payment, totalPrice } = req.body
    try {
         console.log('inside try')
        const user = await UserModel.findById(req.userId)
        if (user) {
            const orders = new UserOrders({
                userId: req.userId,
                userDetails,
                cartProducts: cartItems,
                payment,
                totalPrice
            })
            await orders.save()
            res.status(200).json({ message: "order placed Successfully", success: true })
        }
        else {
            res.status(401).json({ message: "Unauthorized user", success: false })
        }
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }

})

// to get data from orders db
router.get('/fetch', VarifyUser, async (req, res) => {
    try {
        let order;
        if (req.userRole === "admin") {
            order = await UserOrders.find({})
            // console.log(order)
            return res.status(200).json({ message: "your orders", success: true, order })
        }
        else {
            order = await UserOrders.find({ userId: req.userId })
        }
        res.status(200).json({ message: "your orders", success: true, order })
    }
    catch (error) {
        res.status(400).json({ message: "unable to find your orders", success: false, error })
    }
})

// to update order status
router.put('/update-Status', VarifyUser, async (req, res) => {
    try {
        const { orderId, dropdownValue } = req.body
        console.log(orderId, dropdownValue)
        if (req.userRole !== 'admin') {
            return res.status(400).json({ message: "you can't do it", success: false })
        }

        const order = await UserOrders.findById(orderId)
        if (!order) {
            return res.status(400).json({ message: "there is no such user with this id", success: false })
        }

        order.status = dropdownValue
        await order.save()

        // sending all usermodel back
        const allUsers = await UserOrders.find({})
        return res.status(200).json({ message: "updated successfully", success: true, orders: allUsers })
    }
    catch (error) {
        return res.status(400).json({ message: "something went wrong", success: false, error })
    }
})


module.exports = router