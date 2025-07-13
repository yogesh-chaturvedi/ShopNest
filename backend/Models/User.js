const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productId: String,
    selectedSize: String,
    quantity: Number,
    image: String
});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    userCart: [cartSchema]
});

const User = mongoose.model('User', UserSchema);
module.exports = User