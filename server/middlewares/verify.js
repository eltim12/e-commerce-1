const color = require('colors')
const User = require('../models/user')
const tokenAuth = require('../helpers/token')


module.exports = {

    authenticate(req, res, next) {
        console.log('authenticating...'.red)
        try {
            let verified = tokenAuth.verify(req.headers.token)
            req.authenticated = verified
            console.log('user authenticated!'.green.bold)
            next()
        } catch (err) {
            console.log(err)
            res.status(401).json({
                msg: 'user not authenticated'
            })
        }
    },

    authorizationUser(req, res, next) {
        console.log('authorizing...'.red)
        User
            .findById(req.params.id)
            .then(found => {
                if (found._id.toString() === req.authenticated.userId.toString()) {
                    console.log('user authorized!'.green.bold)

                    next()
                } else {
                    res.status(401).json({
                        msg: 'not allowed!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    adminCheck(req, res, next) {
        console.log('authorizing role...'.red)
        if (req.authenticated.role !== 'admin') {
            res.status(401).json({
                msg: 'not allowed!'
            })
        } else {
            console.log('admin authorized!'.green.bold)
            next()
        }
    }
}   