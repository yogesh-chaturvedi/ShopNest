const express = require('express')
const router = express.Router()
const ProductModel = require('../Models/Products')
const varifyUser = require('../Middlewares/VarifyUser')

// to post data
router.post('/products', async (req, res) => {
  try {
    console.log(req.body)
    const product = new ProductModel(req.body)
    await product.save()
    res.status(200).json({ message: "New Product Added Successfully", success: true })
  }
  catch (error) {
    res.status(400).json({ message: "something went wrong", success: false, error })
  }
})

// to get data
router.get('/all', async (req, res) => {
  try {
    const product = await ProductModel.find()
    res.status(200).json({ message: "Product Is fetched Successfully", success: true, product })
  }
  catch (error) {
    res.status(400).json({ message: "something went wrong", success: false, error })
  }
})

// to update available sizes
router.put('/sizeUpdate', varifyUser, async (req, res) => {
  try {
    const { sizeKey, value, itemsId } = req.body

    if (req.userRole !== "admin") {
      res.status(400).json({ message: "Your are not authorized to do this", success: false })
    }
    else {
      const item = await ProductModel.findById(itemsId);

      if (item.size[sizeKey] === true) {
        item.size[sizeKey] = false
      }
      else {
        item.size[sizeKey] = true
      }
      console.log(item.size[sizeKey])

      await item.save();

      const allProducts = await ProductModel.find({})
      res.status(200).json({ message: "size updated", success: true, products: allProducts })
    }

  }
  catch (error) {
    res.status(400).json({ message: "something went wrong", success: false, error })
  }
})

// to delete data
router.delete('/remove/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Product Is Deleted Successfully", success: true })
  }
  catch (error) {
    res.status(400).json({ message: "something went wrong", success: false, error })
  }

})

module.exports = router