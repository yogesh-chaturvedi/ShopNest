const mongoose = require('mongoose')

// const sizeSchema = new mongoose.Schema({
//     available: {
//         required: true,
//         type: Boolean
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// }, { _id: false });     //to prevent generating id for each size


const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    subImage1: {
        type: String,
        required: true
    },
    subImage2: {
        type: String,
        required: true
    },
    subImage3: {
        type: String,
        required: true
    },
    subImage4: {
        type: String,
        required: true
    },
    bestSeller: {
        type: Boolean,
        default: false
    },
    latestCollection: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true
    },
    size: {
        XS: {
            type: Boolean,
            required: true
        },
        S: {
            type: Boolean,
            required: true
        },
        M: {
            type: Boolean,
            required: true
        },
        L: {
            type: Boolean,
            required: true
        },
        XL: {
            type: Boolean,
            required: true
        },
        XXL: {
            type: Boolean,
            required: true
        },
        XXXL: {
            type: Boolean,
            required: true
        },
        XXXXL: {
            type: Boolean,
            required: true
        },
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product