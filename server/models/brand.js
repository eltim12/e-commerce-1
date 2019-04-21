const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = ({
    name: {
        type: String
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand