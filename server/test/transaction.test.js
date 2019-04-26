const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const colors = require('colors')
const base64File = require('../base64file')
const jwt = require('jsonwebtoken')
const Product = require('../models/product')
const User = require('../models/user')
const Transaction = require('../models/transaction')

chai.use(chaiHttp)

before(done => {
    Product
        .deleteMany({}, () => {
            done()
        })
})

before(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})

before(done => {
    Transaction
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    Product
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    Transaction
        .deleteMany({}, () => {
            done()
        })
})


// before(done => {
// })

let productId = ''
let newProduct = {}
let customerId = ''
let customerToken = ''
let transactionId = ""
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWljaGFlbCBFbHRpbSIsImVtYWlsIjoiZWx0aW1AbWFpbC5jb20iLCJ1c2VySWQiOiI1Y2MxYzQ2MTNjNDMxMjU0MTdjYTQyYTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTYyMDI1OTN9.IbmvrAxaYejwstfjAUYJGQyZa7XLPiC7QgAPqV3fEz4'

let input = {
    phone: 897846284746,
    address: 'jalan mana aja boleh',
    totalPayment: 100,
}

describe('Transaction'.bgWhite.black, function () {
    describe('POST /transactions'.underline, function () {

        describe('Success Test'.green, function () {
            it('register new user and get token', function (done) {
                let user = {
                    name: 'Michael Eltim',
                    email: 'eltims@mail.com',
                    password: 'eltim123',
                }

                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        customerId = res.body._id
                        let payload = {
                            name: res.body.name,
                            email: res.body.email,
                            userId: res.body._id,
                            role: res.body.role
                        }
                        customerToken = jwt.sign(payload, 'secret')
                        done()
                    })
            })

            it('should return status code 201 with response body created product', function (done) {
                let input = {
                    phone: 897846284746,
                    address: 'jalan mana aja boleh',
                    totalPayment: 100,
                }
                chai
                    .request(app)
                    .post(`/transactions/checkout/${customerId}`)
                    .set({
                        token: customerToken
                    })
                    .send(input)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('totalPayment')
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('productList')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('phone')
                        expect(res.body).to.have.property('address')


                        expect(res.body._id).to.be.a('string')
                        expect(res.body.totalPayment).to.be.a('number')
                        expect(res.body.status).to.be.a('boolean')
                        expect(res.body.createdAt).to.be.a('string')
                        expect(res.body.productList).to.be.an('array')
                        expect(res.body.userId).to.be.a('string')
                        expect(res.body.phone).to.be.a('string')
                        expect(res.body.address).to.be.a('string')


                        expect(res.body.totalPayment).to.be.equal(100)
                        expect(res.body.status).to.be.equal(false)
                        expect(res.body.createdAt.slice(0, 10)).to.be.equal(new Date().toISOString().slice(0, 10))
                        expect(res.body.userId).to.be.equal(customerId)
                        expect(res.body.phone).to.be.equal("897846284746")
                        expect(res.body.address).to.be.equal('jalan mana aja boleh')

                        transactionId = res.body._id
                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {

            it('should return status code 400 with response body "invalid phone number" if phone number length is less than 10', function (done) {
                let input = {
                    phone: 897884746,
                    address: 'jalan mana aja boleh',
                    totalPayment: 100,
                }
                chai
                    .request(app)
                    .post(`/transactions/checkout/${customerId}`)
                    .set({
                        token: customerToken
                    })
                    .send(input)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('msg')

                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('invalid phone number')

                        done()
                    })
            })

            it('should return status code 400 with response body "invalid phone number" if phone number length is more than 12', function (done) {
                let input = {
                    phone: 897884746,
                    address: 'jalan mana aja boleh',
                    totalPayment: 100,
                }
                chai
                    .request(app)
                    .post(`/transactions/checkout/${customerId}`)
                    .set({
                        token: customerToken
                    })
                    .send(input)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('msg')

                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('invalid phone number')

                        done()
                    })
            })

            it('should return status code 400 with response body "invalid phone number" if phone number contains alphabet', function (done) {
                let input = {
                    phone: "8sdf97884746",
                    address: 'jalan mana aja boleh',
                    totalPayment: 100,
                }
                chai
                    .request(app)
                    .post(`/transactions/checkout/${customerId}`)
                    .set({
                        token: customerToken
                    })
                    .send(input)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('msg')

                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('invalid phone number')

                        done()
                    })
            })
        })
    })

    describe('GET /transactions'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body all transactions', function (done) {
                chai
                    .request(app)
                    .get(`/transactions`)
                    .set({
                        token: adminToken
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('array')

                        expect(res.body[0]).to.be.an('object')

                        expect(res.body[0]).to.have.property('_id')
                        expect(res.body[0]).to.have.property('totalPayment')
                        expect(res.body[0]).to.have.property('status')
                        expect(res.body[0]).to.have.property('createdAt')
                        expect(res.body[0]).to.have.property('productList')
                        expect(res.body[0]).to.have.property('userId')
                        expect(res.body[0]).to.have.property('phone')
                        expect(res.body[0]).to.have.property('address')


                        expect(res.body[0]._id).to.be.a('string')
                        expect(res.body[0].totalPayment).to.be.a('number')
                        expect(res.body[0].status).to.be.a('boolean')
                        expect(res.body[0].createdAt).to.be.a('string')
                        expect(res.body[0].productList).to.be.an('array')
                        expect(res.body[0].userId).to.be.an('object')
                        expect(res.body[0].phone).to.be.a('string')
                        expect(res.body[0].address).to.be.a('string')


                        expect(res.body[0].totalPayment).to.be.equal(100)
                        expect(res.body[0].status).to.be.equal(false)
                        expect(res.body[0].createdAt.slice(0, 10)).to.be.equal(new Date().toISOString().slice(0, 10))

                        expect(res.body[0].userId.role).to.be.equal('customer')
                        expect(res.body[0].userId.address).to.be.equal(null)
                        expect(res.body[0].userId.cart).to.be.an('array')
                        expect(res.body[0].userId.name).to.be.equal('Michael Eltim')
                        expect(res.body[0].userId.email).to.be.equal('eltims@mail.com')

                        expect(res.body[0].phone).to.be.equal("897846284746")
                        expect(res.body[0].address).to.be.equal('jalan mana aja boleh')

                        done()
                    })
            })
        })
    })

    describe('GET /transactions/:id'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body found transactions', function (done) {
                chai
                    .request(app)
                    .get(`/transactions/${transactionId}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('totalPayment')
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('productList')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('phone')
                        expect(res.body).to.have.property('address')


                        expect(res.body._id).to.be.a('string')
                        expect(res.body.totalPayment).to.be.a('number')
                        expect(res.body.status).to.be.a('boolean')
                        expect(res.body.createdAt).to.be.a('string')
                        expect(res.body.productList).to.be.an('array')
                        expect(res.body.userId).to.be.a('string')
                        expect(res.body.phone).to.be.a('string')
                        expect(res.body.address).to.be.a('string')


                        expect(res.body.totalPayment).to.be.equal(100)
                        expect(res.body.status).to.be.equal(false)
                        expect(res.body.createdAt.slice(0, 10)).to.be.equal(new Date().toISOString().slice(0, 10))
                        expect(res.body.userId).to.be.equal(customerId)
                        expect(res.body.phone).to.be.equal("897846284746")
                        expect(res.body.address).to.be.equal('jalan mana aja boleh')

                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {
            it('should return status code 404 with message "not Found"', function (done) {
                chai
                    .request(app)
                    .get(`/transactions/5cb49c7de83d802cb2589d93`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('not Found.')

                        done()
                    })
            })
        })
    })

    describe('PATCH /transactions/:id'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body with updated transaction with status true', function (done) {
                let updateInput = {
                    status: true,
                }
                chai
                    .request(app)
                    .patch(`/transactions/${transactionId}`)
                    .set({
                        token: customerToken
                    })
                    .send(updateInput)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('totalPayment')
                        expect(res.body).to.have.property('status')
                        expect(res.body).to.have.property('createdAt')
                        expect(res.body).to.have.property('productList')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('phone')
                        expect(res.body).to.have.property('address')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.totalPayment).to.be.a('number')
                        expect(res.body.status).to.be.a('boolean')
                        expect(res.body.createdAt).to.be.a('string')
                        expect(res.body.productList).to.be.an('array')
                        expect(res.body.userId).to.be.a('string')
                        expect(res.body.phone).to.be.a('string')
                        expect(res.body.address).to.be.a('string')

                        expect(res.body.totalPayment).to.be.equal(100)
                        expect(res.body.status).to.be.equal(true)
                        expect(res.body.createdAt.slice(0, 10)).to.be.equal(new Date().toISOString().slice(0, 10))
                        expect(res.body.userId).to.be.equal(customerId)
                        expect(res.body.phone).to.be.equal("897846284746")
                        expect(res.body.address).to.be.equal('jalan mana aja boleh')

                        done()
                    })
            })

        })

        describe('Error Test'.red, function () {
            it('should return status code 404 with message "not Found"', function (done) {
                let updateData = {
                    status: true
                }
                chai
                    .request(app)
                    .patch(`/transactions/5cb49c7de83d802cb2589d93`)
                    .set({
                        token: customerToken
                    })
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('not Found.')

                        done()
                    })
            })

            it('should return status code 401 with message "not allowed!"', function (done) {
                let updateData = {
                    status: true
                }
                chai
                    .request(app)
                    .patch(`/transactions/${transactionId}`)
                    .send(updateData)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.a('string')
                        expect(res.body.msg).to.be.equal('user not authenticated')

                        done()
                    })
            })
        })
    })
})