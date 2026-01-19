const express = require('express')
const router = express.Router()
const CartModel = require('../Models/Cart')
const OrderModel = require('../Models/Orders')
const Stripe = require('stripe')
const varifyUser = require('../Middlewares/VarifyUser')



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// define the home page route
router.post('/create-checkout-session', varifyUser, async (req, res) => {

    const { userDetails, payment, totalPrice } = req.body;

    if (!userDetails || !payment || !totalPrice) {
        return res.status(400).json({ message: "Delivery details missing" })
    }

    const cart = await CartModel.findOne({ Uid: req.userId }).populate({
        path: 'items.product',
        select: 'productName productPrice image'
    })

    if (!cart) {
        return res.status(400).json({ message: "Cart not found", success: false })
    }

    cartProducts = cart.items.map(item => ({
        product: item.product._id,
        productName: item.product.productName,
        productPrice: Number(item.product.productPrice),
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        image: item.product.image,
    }))


    const order = await OrderModel.create({
        userId: req.userId,
        userDetails,
        cartProducts,
        payment,
        totalPrice,
    })

    const line_items = cart.items.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.product.productName,
                images: [item.product.image],
            },
            unit_amount: item.product.productPrice * 100
        },
        quantity: item.quantity,
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            metadata: {
                orderId: order._id.toString() // KEY LINK
            },
            success_url: 'https://shop-nest-livid.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://shop-nest-livid.vercel.app/cancel'
        })
        res.json({ id: session.id })
    }
    catch {
        console.error("Stripe Payment error", error)
        res.status(500).json({ error: 'Stripe Payment Failed' })
    }
})


module.exports = router