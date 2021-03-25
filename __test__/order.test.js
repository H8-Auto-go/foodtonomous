const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../helpers/jwt');
const { sequelize, Driver, User, Order } = require("../models");
const { queryInterface } = sequelize
let idUserLain
let token
let tokenDrive
let idUser
let idOrder
afterAll((done) => {
    console.log('TERAKIR')
    User.destroy({ where: { id: idUser } })
        .then(_ => {
            return queryInterface.bulkDelete('Orders', {})
        })
        .then((_) => {
            done()
        })
        .catch((err) => done(err))
})

beforeAll(done => {
    User.create({
        email: 'agung5@mail.com',
        password: '123',
        role: 'user'
    })
        .then((user) => {
            return User.findOne({
                where: { email: user.email }
            })
        })
        .then((user) => {
            idUser = user.id
            token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })
            return Driver.findOne({
                where: {
                    email: 'amos@xavier.com'
                }
            })
        })
        .then((driver) => {
            tokenDrive = generateToken({
                id: driver.id,
                email: driver.email,
                role: driver.role
            })
            return Order.create({

                "status": "done",
                "userId": idUser,
                "restaurantId": 2,
                "driverId": 1,
                "foodId": 4,
                socketUserId: 1,
                restaurantId: 1

            })
        })
        .then((order) => {
            idOrder = order.id
            done()
        })
        .catch((err) => {
            done(err)
        })
})


describe('order routes', () => {

    describe('get order', () => {
        console.log(idOrder, 'INIHORDER');
        test('should ', (done) => {
            console.log(idOrder, 'inihDI DALAM');
            request(app)
                .get(`/orders/history`)
                .set('access_token', token)
                .end((err, res) => {
                    if (err) done(err)

                    expect(res.status).toBe(200)
                    done()
                })
        })
        // test('should ', (done) => {
        //     console.log(idOrder, 'inihDI DALAM');
        //     request(app)
        //         .get(`/orders/history`)
        //         .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmdnYUB4YXZpZXIuY29tIiwibmFtZSI6IkFuZ2dhIE1hdWxhbmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTYxNjUyMzYyM30.CxdRTKkcfhgsPtg0DD3v7_jJqLBR1pKYy07GZD87un8')
        //         .end((err, res) => {
        //             if (err) done(err)

        //             expect(res.status).toBe(404)
        //             done()
        //         })
        // })
    })
    describe('server error', () => {
        test('should ', (done) => {
            request(app)
                .get(`/orders/1`)
                .set('access_token', token)
                .end((err, res) => {
                    if (err) done(err)

                    expect(res.status).toBe(500)
                    done()
                })
        })

    })
    describe('get all history user', () => {
        describe('success get history', () => {
            test('should ', (done) => {
                request(app)
                    .get(`/orders/${idOrder}`)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)
                        console.log(res.body, '============================');
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })

    describe('update patch location', () => {
        test('should ', (done) => {
            const data = {"longitude":107.622807235,"latitude":-6.9455692344}
            request(app)
                .patch(`/orders/loc-update/${idOrder}`)
                .set('access_token', tokenDrive)
                .send(data)
                .end((err, res) => {
                    if (err) done(err)

                    expect(res.status).toBe(200)
                    done()
                })
        })

    })

    describe('delete order', () => {
        describe('success delete', () => {
            test('should ', (done) => {
                request(app)
                    .delete(`/orders/${idOrder}`)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)
    
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('error delete not found', () => {
            test('should ', (done) => {
                request(app)
                    .delete(`/orders/1`)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)
    
                        expect(res.status).toBe(404)
                        done()
                    })
            })
        })
    })
})