const mongoose = require('mongoose');
const User = require('./User');


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userDetails: {
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        country: String,
        city: String,
        zipCode: String,
        phone: String,
    },
    cartProducts: [
        {
            productName: String,
            productPrice: Number,
            selectedSize: String,
            quantity: Number,
            image: String,
            productId: String
        }
    ],
    status: {
        type: String,
        default: "Order Placed"
    },
    payment: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders