const express = require('express')
const router = express.Router()
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// define the home page route
router.post('/create-checkout-session', async (req, res) => {

    const { cartItems } = req.body;

    console.log(cartItems)
    const line_items = cartItems.map((items) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: items.productName,
                images: [items.image],
            },
            unit_amount: items.productPrice * 100
        },
        quantity: items.quantity,
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://shop-nest-livid.vercel.app/success',
            cancel_url: 'https://shop-nest-livid.vercel.app/cancel'
        })
        res.json({ id: session.id })
    }
    catch {
        console.error(error)
        res.status(500).json({ error: 'Failed to create session' })
    }

})


module.exports = router

