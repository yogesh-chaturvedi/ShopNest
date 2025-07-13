const express = require('express')
const router = express.Router()
const productModel = require('../Models/Products')


// define the home page route
router.get('/products', async (req, res) => {
    try {
        const userQuery = req.query.query || ''
        // console.log(userQuery)
        const searchedProduct = await productModel.find({
            productName: {
                $regex: userQuery,
                $options: 'i'
            }
        })
        // console.log(searchedProduct)
        res.status(200).json({ message: 'your searched data', success: true, searchedProduct })
    }
    catch (error) {
        res.status(400).json({ message: "no product like that", sucess: false, error })
    }

})


module.exports = router
