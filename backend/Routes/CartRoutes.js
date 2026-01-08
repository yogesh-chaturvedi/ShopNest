const express = require('express')
const router = express.Router()
const userModel = require('../Models/User')
const varifyUser = require('../Middlewares/VarifyUser')

// to save data
router.post('/cart', varifyUser, async (req, res) => {
    try {
        const { selectedSize, quantity, productName, productPrice, _id, image } = req.body
        const user = await userModel.findById(req.userId)

        const isExist = user.userCart.find(item => {
            return (item._id.toString() === _id.toString() && item.selectedSize === selectedSize)
        })

        if (isExist) {
            isExist.quantity = isExist.quantity + quantity
        }
        else {
            user.userCart.push(req.body)
        }
        await user.save()

        res.status(200).json({ message: "Item Added", success: true, userCart: user.userCart })
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }
})

// to fetch data 
router.get('/cart', varifyUser, async (req, res) => {
    const user = await userModel.findById(req.userId)
    res.status(200).json({ message: "user found", success: true, userCart: user.userCart })
})

// to delete cart data 
router.delete('/cart', varifyUser, async (req, res) => {
    try {
        const { itemId, itemSize } = req.body
        const user = await userModel.findById(req.userId)

        user.userCart = user.userCart.filter(item => {
            return !(item._id.toString() === itemId && item.selectedSize.toString() === itemSize)
        })

        await user.save()

        res.status(200).json({ message: "Item deleted successfully", success: true, userCart: user.userCart })
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong", success: false, error })
    }

})

// to update quantity of products 
router.put('/cart', varifyUser, async (req, res) => {
    try {
        const { itemsId, itemsSize, action } = req.body;
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(401).json({ message: "thre are no such user with this id", success: false, error })
        }

        const isExist = user.userCart.find(item => {
            return (item._id.toString() === itemsId && item.selectedSize.toString() === itemsSize)
        })

        if (isExist) {
            if (action === "increment") {
                isExist.quantity += 1
            }
            else if (action === "decrement") {
                if (isExist.quantity === 1) {
                    return res.status(401).json({ message: "It sholud be atleast 1", success: false })
                }
                else {
                    isExist.quantity -= 1
                }
            }
            else {
                return res.status(401).json({ message: "unavailable action", success: false })
            }

            await user.save()
            return res.status(200).json({ message: "changed successfully", success: true, userCart: user.userCart })
        }

    } catch (error) {
        return res.status(400).json({ message: "something went wrong", success: false, error })
    }

})

// it runds when someone place order
router.delete('/remove-allItem', varifyUser, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({ message: "unauthorized user", success: false })
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
