const Product = require('../models/product')
const Brand = require('../models/brand')

module.exports = {

    findAll(req, res) {
        let search = {}

        if (req.query.name) {
            search = {
                name: {
                    $regex: '.*' + req.query.name + '.*',
                    $options: "i"
                }
            }
        }

        Product
            .find(search)
            .then(allProducts => {
                res.status(200).json(allProducts)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findOne(req, res) {
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    res.status(200).json(found)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err
                })
            })
    },

    async create(req, res) {
        try {
            let product = await Product.create({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
                photo: req.fileUrl
            })

            let found = await Brand.findOne({
                name: new RegExp('\\b' + req.body.brand + '\\b', 'i')
            })
            if (found === null) {
                let createdBrand = await Brand.create({
                    name: req.body.brand
                })
                await Brand.findByIdAndUpdate(createdBrand._id, {
                    $push: { products: product._id }
                })
            } else {
                await Brand.findOneAndUpdate({
                    name: new RegExp('\\b' + req.body.brand + '\\b', 'i')
                }, {
                        $push: { products: product._id }
                    })
            }
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json({
                msg: err.message
            })
        }
    },

    update(req, res) {
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Product.findByIdAndUpdate(req.params.id, {
                        name: req.body.name,
                        price: req.body.price,
                        stock: req.body.stock,
                        photo: req.fileUrl
                    }, { new: true })
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    reduceStock(req, res) {
        let currentStock = 0
        Product
            .findById(req.params.id)
            .then(found => {
                currentStock = found.stock
                return Product.findByIdAndUpdate(req.params.id, {
                    stock: currentStock - 1
                }, { new: true })
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    delete(req, res) {
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Product.findByIdAndDelete(req.params.id)
                }
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}