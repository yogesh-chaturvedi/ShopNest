const express = require('express')
const router = express.Router()
const userModel = require('../Models/User')
const CartModel = require('../Models/Cart')
const ProductModel = require('../Models/Products')
const varifyUser = require('../Middlewares/VarifyUser')

// to save data
router.post('/cart', varifyUser, async (req, res) => {
    try {
        const { selectedSize, quantity, productName, productPrice, _id, image } = req.body
        const cart = await CartModel.findOne({ Uid: req.userId })

        if (!cart) {
            const createCart = new CartModel({
                Uid: req.userId,
                items: [
                    {
                        product: _id,
                        quantity,
                        selectedSize,
                    }
                ],
                selectedSize,
            })
            await createCart.save()
            return res.status(200).json({ message: "Item Added Successfully", success: true, userCart: createCart })

        }
        else {
            const itemIndex = cart.items.findIndex(item => {
                return (item.product.toString() === _id.toString() && item.selectedSize === selectedSize);
            })

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            }
            else {
                cart.items.push({
                    product: _id,
                    quantity,
                    selectedSize,
                })
            }
            await cart.save()
            return res.status(200).json({ message: "Item Added", success: true, userCart: cart })
        }
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }
})

// to fetch data 
router.get('/fetch', varifyUser, async (req, res) => {
    const cart = await CartModel.findOne({ Uid: req.userId }).populate({ path: 'items.product', select: '_id productName productPrice category description image' })
    res.status(200).json({ message: "User's Cart featched Successfully", success: true, userCart: cart })
})

// to delete cart data 
router.delete('/removeItem', varifyUser, async (req, res) => {
    try {
        const { itemId, itemSize } = req.body
        const cart = await CartModel.findOne({ Uid: req.userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false, error })
        }

        cart.items = cart.items.filter(item => {
            return !(item.product.toString() === itemId && item.selectedSize.toString() === itemSize)
        })

        await cart.save()

        res.status(200).json({ message: "Item removed successfully", success: true, userCart: cart })
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }

})

// to update quantity of products 
router.put('/changeQuantity', varifyUser, async (req, res) => {
    try {
        const { itemsId, itemsSize, action } = req.body;
        const cart = await CartModel.findOne({ Uid: req.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false, error })
        }

        const itemIndex = cart.items.findIndex(item => {
            return (item.product.toString() === itemsId && item.selectedSize.toString() === itemsSize)
        })

        if (itemIndex > -1) {
            if (action === "increment") {
                cart.items[itemIndex].quantity += 1
            }
            else if (action === "decrement") {
                if (cart.items[itemIndex].quantity === 1) {
                    return res.status(400).json({ message: "It sholud be atleast 1", success: false })
                }
                else {
                    cart.items[itemIndex].quantity -= 1
                }
            }
            else {
                return res.status(401).json({ message: "unavailable action", success: false })
            }

            await cart.save()
            return res.status(200).json({ message: "Quantity updated successfully", success: true, userCart: cart })
        }

    } catch (error) {
        return res.status(400).json({ message: "something went wrong", success: false, error })
    }

})

// it runds when someone place order
router.delete('/remove-allItem', varifyUser, async (req, res) => {
    try {
        const cart = await CartModel.findOne({ Uid: req.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false, error })
        }
        else {
            user.userCart = []
            await user.save()
            return res.status(200).json({ message: "updated", success: true, userCart: user.userCart })
        }

    } catch (error) {
        return res.status(400).json({ message: "something went wrong", success: false, error })
    }
})

module.exports = router
