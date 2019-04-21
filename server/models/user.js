const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "password must be less than 5 characters."]
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: function emailValidate(value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                message: "invalid email format"
            },
            {
                validator: async function unique(value) {
                    let found = await User.findOne({ email: value })
                    if (found && found._id.toString() !== this._id.toString()) {
                        return false
                    } else {
                        return true
                    }
                },
                message: "Email has been used"

            }
        ]
    },
    role: {
        type: String,
        default: 'customer'
    },
    address: {
        type: String,
        default: null
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User