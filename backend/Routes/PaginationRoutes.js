const express = require('express')
const router = express.Router()
const UserOrders = require('../Models/Orders')


router.get('/orders', async (req, res) => {
    try {
        const page = req.query.currentPage || 1;
        const limit = req.query.limit || 5;

        const skip = (page - 1) * limit

        const data = await UserOrders.find().skip(skip).limit(limit);
        const totalPages = await UserOrders.countDocuments()
        res.status(200).json({ message: "Pagination successfull", data: data, currentPageVal: page, totalPages: Math.ceil(totalPages / limit), success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", success: false, error })
    }
})

module.exports = router
