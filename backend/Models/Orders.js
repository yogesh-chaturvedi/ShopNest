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
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productName: {
                type: 'String',
                required: true
            },
            productPrice: {
                type: 'Number',
                required: true
            },
            selectedSize: {
                type: 'String',
                required: true
            },
            quantity: {
                type: 'Number',
                required: true
            },
            image: {
                type: 'String',
                required: true
            },
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
}, { timestamps: true });


const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders