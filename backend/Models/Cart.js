const mongoose = require('mongoose')


const CartSchema = new mongoose.Schema({
    Uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            },
            selectedSize: {
                type: String,
                required: true
            },
        }
    ],

});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart