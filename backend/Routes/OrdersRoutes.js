const express = require('express')
const router = express.Router()
const VarifyUser = require('../Middlewares/VarifyUser')
const UserModel = require('../Models/User')
const OrderModel = require('../Models/Orders')
const CartModel = require('../Models/Cart')
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//  to save orders in db
router.post('/save', VarifyUser, async (req, res) => {
    const { userDetails, cartItems, payment, totalPrice } = req.body
    try {

        const cart = await CartModel.findOne({ Uid: req.userId }).populate('items.product')

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty", success: false })
        }

        else {

            cartProducts = cart.items.map(item => ({
                product: item.product._id,
                productName: item.product.productName,
                productPrice: item.product.productPrice,
                selectedSize: item.selectedSize,
                quantity: item.quantity,
                image: item.product.image,
            }))

            const order = new OrderModel(
                {
                    userId: req.userId,
                    userDetails,
                    cartProducts,
                    payment,
                    totalPrice,
                }
            )

            cart.items = [];
            await cart.save();
            await order.save();
            return res.status(200).json({ message: "Order saved successfully", success: true })
        }
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }
})

// to get data from orders db
router.get('/fetch', VarifyUser, async (req, res) => {
    try {
        let order
        if (req.userRole === "admin") {
            order = await OrderModel.find({})

            if (!order) {
                return res.status(404).json({ message: "Order not found", success: false })
            }

            return res.status(200).json({ message: "Orders fetched successfully", success: true, order })
        }
        else {
            order = await OrderModel.find({ userId: req.userId })

            if (!order) {
                return res.status(404).json({ message: "User's Order not found", success: false })
            }

            return res.status(200).json({ message: "Orders fetched successfully", success: true, order })
        }
    }
    catch (error) {
        res.status(400).json({ message: "unable to find your orders", success: false, error })
    }
})

// to update order status
router.put('/update-Status', VarifyUser, async (req, res) => {
    try {
        const { orderId, dropdownValue } = req.body

        if (req.userRole !== 'admin') {
            return res.status(400).json({ message: "you can't do it", success: false })
        }

        const order = await OrderModel.findById(orderId)
        if (!order) {
            return res.status(400).json({ message: "there is no such user with this id", success: false })
        }

        order.status = dropdownValue
        await order.save()

        // sending all usermodel back
        const allUsers = await OrderModel.find({})
        return res.status(200).json({ message: "updated successfully", success: true, orders: allUsers })
    }
    catch (error) {
        return res.status(400).json({ message: "something went wrong", success: false, error })
    }
})

router.post('/verify-payment', VarifyUser, async (req, res) => {
    try {
        const { sessionId } = req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ success: false })
        }

        const orderId = session.metadata.orderId

        // 🔹 Mark order as paid
        await OrderModel.findByIdAndUpdate(orderId, {
            status: "Order Placed"
        })

        // 🔹 Clear cart
        await CartModel.findOneAndUpdate(
            { Uid: req.userId },
            { items: [] }
        )

        res.json({ success: true })
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ message: "verify-payment route error", success: false })
    }
})



module.exports = router