const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const colors = require('colors')

chai.use(chaiHttp)

after(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})


let token = ''
let userId = ''

describe('Users'.bgWhite.black, function () {
    describe('POST /users/register'.underline, function () {

        describe('Success Test'.green, function () {

            it('should return status code 201 with response body created user', function (done) {
                let user = {
                    name: 'Michael Eltim',
                    email: 'eltim@mail.com',
                    password: 'eltim123',
                    role: 'customer'
                }

                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)

                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('password')
                        expect(res.body).to.have.property('role')

                        expect(res.body._id).to.be.a('string')
                        expect(res.body.name).to.be.a('string')
                        expect(res.body.email).to.be.a('string')
                        expect(res.body.password).to.be.a('string')
                        expect(res.body.role).to.be.a('string')

                        expect(res.body.name).to.be.equal('Michael Eltim')
                        expect(res.body.email).to.be.equal('eltim@mail.com')
                        expect(res.body.password).to.not.be.equal('eltim123')
                        expect(res.body.role).to.be.equal('customer')

                        done()
                    })
            })
        })

        describe('Error Test'.red, function () {

            it('should return status code 400 with message "Email has been used"', function (done) {
                let user = {
                    name: 'Michael Eltim',
                    email: 'eltim@mail.com',
                    password: 'eltim123',
                    role: 'customer'
                }

                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.msg).to.be.equal('Email has been used')

                        done()
                    })
            })

            it('should return status code 400 with message "Path `name` is required."', function (done) {
                let user = {
                    email: 'william@mail.com',
                    role: 'customer',
                    password: 'william123'
                }
                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `name` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "Path `email` is required."', function (done) {
                let user = {
                    name: 'William Suryawan',
                    role: 'customer',
                    password: 'william123'
                }
                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `email` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "Path `password` is required."', function (done) {
                let user = {
                    name: 'William Suryawan',
                    email: 'william@mail.com',
                    role: 'customer'
                }
                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('Path `password` is required.')
                        done()
                    })
            })

            it('should return status code 400 with message "invalid email format"', function (done) {
                let user = {
                    name: 'William Suryawan',
                    email: 'william',
                    role: 'customer',
                    password: 'william123'
                }
                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('invalid email format')
                        done()
                    })
            })

            it('should return status code 400 with message "password must be less than 5 characters."', function (done) {
                let user = {
                    name: 'William Suryawan',
                    email: 'william@mail.com',
                    password: 'wil',
                    role: 'customer',
                }
                chai
                    .request(app)
                    .post(`/users/register`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('password must be less than 5 characters.')
                        done()
                    })
            })

        })

    })

    describe('POST /users/login'.underline, function () {
        describe('Success Test'.green, function () {

            it('should return status code 200 with response body token, email, name and userId', function (done) {
                let user = {
                    email: 'eltim@mail.com',
                    password: 'eltim123',
                }

                chai
                    .request(app)
                    .post(`/users/login`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('token')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('email')
                        expect(res.body).to.have.property('userId')

                        userId = res.body.userId
                        token = res.body.token
                        done()
                    })
            })
        })
        describe('Error Test'.red, function () {

            it('should return status code 401 with message "email/password wrong."', function (done) {
                let user = {
                    email: 'eltim',
                    password: 'eltim123',
                }

                chai
                    .request(app)
                    .post(`/users/login`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.msg).to.be.equal('email/password wrong.')

                        done()
                    })
            })

            it('should return status code 401 with message "email/password wrong."', function (done) {
                let user = {
                    email: 'eltim@mail.com',
                    password: 'eltim12',
                }

                chai
                    .request(app)
                    .post(`/users/login`)
                    .send(user)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.msg).to.be.equal('email/password wrong.')

                        done()
                    })
            })

        })

    })

    describe('POST /users/verify'.underline, function () {

        describe('Success Test'.green, function () {

            it('should return status code 200 with message "user authenticated" if token is authenticated', function (done) {
                chai
                    .request(app)
                    .post('/users/verify')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null

                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('user authenticated')

                        done()
                    })
            })
        })
        describe('Error Test'.red, function () {
            it('should return status code 401 with message "user not authenticated" if token is not authenticated', function (done) {
                chai
                    .request(app)
                    .post('/users/verify')
                    .set('token', 'faketokenlmao')
                    .end(function (err, res) {
                        expect(err).to.be.null

                        expect(res).to.have.status(401)
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('user not authenticated')

                        done()
                    })
            })
        })
    })

    describe('PATCH /users/:id'.underline, function () {

        describe('Success Test'.green, function () {

            it('should return status code 200 with response body user with updated name', function (done) {
                let updateUser = {
                    name: "Michael Bay"
                }
                chai
                    .request(app)
                    .patch(`/users/${userId}`)
                    .set('token', token)
                    .send(updateUser)
                    .end(function (err, res) {

                        expect(err).to.be.null

                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('name')
                        expect(res.body.name).to.be.equal('Michael Bay')

                        done()
                    })
            })

            it('should return status code 200 with response body user with updated email', function (done) {
                let updateUser = {
                    email: "bay@mail.com"
                }
                chai
                    .request(app)
                    .patch(`/users/${userId}`)
                    .set('token', token)
                    .send(updateUser)
                    .end(function (err, res) {

                        expect(err).to.be.null

                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('email')
                        expect(res.body.email).to.be.equal('bay@mail.com')

                        done()
                    })
            })
        })
        describe('Error Test'.red, function () {
            it('should return status code 401 with message "user not authenticated" if token is not authenticated', function (done) {
                let updateUser = {
                    email: "michael@mail.com"
                }
                chai
                    .request(app)
                    .patch(`/users/${userId}`)
                    .set('token', 'faketokenlmao')
                    .send(updateUser)
                    .end(function (err, res) {

                        expect(err).to.be.null

                        expect(res).to.have.status(401)
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('user not authenticated')

                        done()
                    })
            })

            it('should return status code 404 with message "not Found." if user not found', function () {
                let updateUser = {
                    email: "bay@mail.com"
                }
                chai
                    .request(app)
                    .patch(`/users/5cb47182b6084e782e68b871`)
                    .set('token', token)
                    .send(updateUser)
                    .end(function (err, res) {

                        expect(err).to.be.null

                        expect(res).to.have.status(404)
                        expect(res.body).to.have.property('msg')
                        expect(res.body.msg).to.be.equal('not Found.')

                        done()
                    })
            })
        })
    })
})