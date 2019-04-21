const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        default: null
    }
})

let Product = mongoose.model('Product', productSchema)


module.exports = Product