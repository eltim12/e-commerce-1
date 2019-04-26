const Brand = require('../models/brand')

module.exports = {

    findAll(req, res) {
        Brand
            .find({})
            .populate('products')
            .then(brand => {
                res.status(200).json(brand)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    findByName(req, res) {
        Brand
            .findOne({
                name: new RegExp('\\b' + req.query.name + '\\b', 'i')
            })
            .populate('products')
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
                    msg: err.message
                })
            })
    }
}