const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const colors = require('colors')
const jwt = require('jsonwebtoken')
const base64File = require('../base64file')

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

let productId = ''
let newProduct = {}
let customerToken = ''
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWljaGFlbCBFbHRpbSIsImVtYWlsIjoiZWx0aW1AbWFpbC5jb20iLCJ1c2VySWQiOiI1Y2MxYzQ2MTNjNDMxMjU0MTdjYTQyYTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NTYyMDI1OTN9.IbmvrAxaYejwstfjAUYJGQyZa7XLPiC7QgAPqV3fEz4'

describe('Products'.bgWhite.black, function () {
    describe('POST /products'.underline, function () {

        describe('Success Test'.green, function () {

            it('should return status code 201 with response body created product', function (done) {
                let product = {
                    name: 'Nike Shoes',
                    stock: 5,
                    price: 100,
                    image: base64File,
                    brand: 'Nike'
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('photo')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.stock).to.be.a('number')
                        expect(res.body.price).to.be.a('number')
                        expect(res.body.photo).to.be.a('string')

                        expect(res.body.name).to.be.equal('Nike Shoes')
                        expect(res.body.stock).to.be.equal(5)
                        expect(res.body.price).to.be.equal(100)
                        newProduct = res.body

                        productId = res.body._id
                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {

            it('should return status code 400 with message "Path `name` is required."', function (done) {
                let product = {
                    stock: 5,
                    price: 100,
                    image: base64File
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        // console.log(res.status)
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `name` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "Path `stock` is required."', function (done) {
                let product = {
                    name: "Nike Shoes",
                    price: 100,
                    image: base64File
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `stock` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "Path `price` is required."', function (done) {
                let product = {
                    name: "Nike Shoes",
                    stock: 1,
                    image: base64File
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `price` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "Cast to Number failed for value "one" at path "stock""', function (done) {
                let product = {
                    name: "Nike Shoes",
                    stock: 'one',
                    price: 100,
                    image: base64File
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Cast to Number failed for value "one" at path "stock"')
                        done()
                    })
            })

            it('should return status code 400 with message "Cast to Number failed for value "one" at path "price""', function (done) {
                let product = {
                    name: "Nike Shoes",
                    stock: 1,
                    price: "two",
                    image: base64File
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: adminToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Cast to Number failed for value "two" at path "price"')
                        done()
                    })
            })

            it('register new user and get token', function (done) {
                let user = {
                    name: 'Michael Eltim',
                    email: 'eltimss@mail.com',
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
            it('should return status code 401 with message "not allowed!" if token is from customer', function (done) {
                let product = {
                    name: 'Nike Shoes',
                    stock: 5,
                    price: 100,
                    image: base64File,
                    brand: 'Nike'
                }
                chai
                    .request(app)
                    .post(`/products`)
                    .set({
                        token: customerToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        console.log(res.body, res.status)
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('not allowed!')
                        done()
                    })
            })
        })
    })

    describe('GET /products'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body all products', function (done) {
                chai
                    .request(app)
                    .get(`/products`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('array')
                        expect(res.body.length).to.be.equal(1)

                        done()
                    })
            })

        })

    })

    describe('GET /products/:id'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body found products', function (done) {
                chai
                    .request(app)
                    .get(`/products/${productId}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('photo')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.stock).to.be.a('number')
                        expect(res.body.price).to.be.a('number')
                        expect(res.body.photo).to.be.a('string')

                        expect(res.body._id).to.be.equal(newProduct._id)
                        expect(res.body.name).to.be.equal(newProduct.name)
                        expect(res.body.stock).to.be.equal(newProduct.stock)
                        expect(res.body.price).to.be.equal(newProduct.price)
                        expect(res.body.photo).to.be.equal(newProduct.photo)

                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {
            it('should return status code 404 with message "not Found"', function (done) {
                chai
                    .request(app)
                    .get(`/products/5cb49c7de83d802cb2589d9d`)
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

    describe('PATCH /products/:id'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body with updated product', function (done) {
                let updateData = {
                    name: "Adidas Shoes",
                    stock: 10,
                    price: 200,
                    image: base64File
                }
                chai
                    .request(app)
                    .patch(`/products/${productId}`)
                    .set({
                        token: adminToken
                    })
                    .send(updateData)
                    .end(function (err, res) {

                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('photo')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.stock).to.be.a('number')
                        expect(res.body.price).to.be.a('number')
                        expect(res.body.photo).to.be.a('string')

                        expect(res.body._id).to.be.equal(productId)
                        expect(res.body.name).to.be.equal('Adidas Shoes')
                        expect(res.body.stock).to.be.equal(10)
                        expect(res.body.price).to.be.equal(200)

                        done()
                    })
            })

        })

        describe('Error Test'.red, function () {
            it('should return status code 404 with message "not Found"', function (done) {
                let updateData = {
                    name: "Adidas Shoes",
                    stock: 10,
                    price: 200,
                    image: base64File
                }
                chai
                    .request(app)
                    .patch(`/products/5cb5799176fe6028a9de201f`)
                    .set({
                        token: adminToken
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

            it('should return status code 401 with message "not allowed!" if token is from customer', function (done) {
                let product = {
                    name: 'Nike Shoes',
                    stock: 5,
                    price: 100,
                    image: base64File,
                    brand: 'Nike'
                }
                chai
                    .request(app)
                    .patch(`/products/:id`)
                    .set({
                        token: customerToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('not allowed!')
                        done()
                    })
            })
        })
    })

    describe('DELETE /products/:id'.underline, function () {
        describe('Success Test'.green, function () {
            it('should return status code 200 with response body with updated product', function (done) {

                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set({
                        token: adminToken
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)

                        expect(res.body).to.be.an('object')

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('stock')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('photo')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.stock).to.be.a('number')
                        expect(res.body.price).to.be.a('number')
                        expect(res.body.photo).to.be.a('string')

                        expect(res.body._id).to.be.equal(productId)
                        expect(res.body.name).to.be.equal('Adidas Shoes')
                        expect(res.body.stock).to.be.equal(10)
                        expect(res.body.price).to.be.equal(200)

                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {
            it('should return status code 404 with message "not Found"', function (done) {
                chai
                    .request(app)
                    .delete(`/products/5cb5799176fe6028a9de201f`)
                    .set({
                        token: adminToken
                    })
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

            it('should return status code 401 with message "not allowed!" if token is from customer', function (done) {
                let product = {
                    name: 'Nike Shoes',
                    stock: 5,
                    price: 100,
                    image: base64File,
                    brand: 'Nike'
                }
                chai
                    .request(app)
                    .delete(`/products/:id`)
                    .set({
                        token: customerToken
                    })
                    .send(product)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('not allowed!')
                        done()
                    })
            })
        })
    })
})