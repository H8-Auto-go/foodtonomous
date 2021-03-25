const request = require('supertest');
const app = require('../app')
const { sequelize, User, Driver } = require("../models");
const { queryInterface } = sequelize

let token
let idUser
let idDriver
const data = {
    email: 'arnold@mail.com',
    password: 'secret',
    role: 'user'
}

const driver = {
    email: 'anjay@mail.com',
    password: 'secret',
    role: 'driver'
}
afterAll((done) => {
    User.destroy({where:{id:idUser}})
    .then(_ => {
        console.log(idDriver, '===========');
        return Driver.destroy({where:{id:idDriver}})
    })
    .then(_ => {
        done()
        sequelize.close()
    })
    .catch((err) => {
        done(err)
    })
})

describe('user route', () => {
    describe('register /post', () => {
        describe('succes proses', () => {
            test('response 201 register', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err)
                        console.log(res.body);
                        idUser = res.body.id
                        expect(res.status).toBe(201)
                        done()
                    })
            })
            test('response 201 register driver', (done) => {
                request(app)
                    .post('/register')
                    .send(driver)
                    .end((err, res) => {
                        console.log(res.body.id);
                        idDriver = res.body.id
                        expect(res.status).toBe(201)
                        done()
                    })
            })

        })
        describe('Error process', () => {
            test('should response with 400 status code when user register email alraedy exist', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should response with 400 status code when invalid format email', (done) => {
                const data = {
                    email: 'amosmail.com',
                    password: 'amos',
                    role: "user"
                }

                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) throw done(err)
                        console.log(res.body);
                        expect(res.status).toBe(400)
                        expect(typeof res.body).toBe('object')
                        done()
                    })
            })
        })
    })
    describe('login /post', () => {
        describe('success proses', () => {
            test('should response with 200 status code when login succeed', (done) => {
                request(app)
                    .post('/login/user')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err)
                        expect(res.status).toBe(200)
                        token = res.body.access_token
                        expect(res.body).toHaveProperty('access_token')
                        done()
                    })
            })
        })
        describe('error proses', () => {
            test('should response with 404 status code when user / email wrong', (done) => {
                const body = {
                    email: 'adn@mail.com',
                    password: 'amos'
                }

                request(app)
                    .post('/login/user')
                    .send(body)
                    .end((err, res) => {
                        if (err) done(err)
                        expect(res.status).toBe(401)
                        expect(typeof res.body).toEqual('object')
                        done()
                    })
            })
        })

        test('should response with 404 status code when user / email wrong', (done) => {
            const body = {
                email: 'admin@mail.com',
                password: 'amosww'
            }

            request(app)
                .post('/login/user')
                .send(body)
                .end((err, res) => {
                    if (err) done(err)
                    expect(res.status).toBe(401)
                    expect(typeof res.body).toEqual('object')
                    done()
                })
        })
    })
    describe('get user', () => {
        describe('success prosess', () => {
            test('response 200 get all user', (done) => {
                request(app)
                    .get('/users')
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)
                        console.log(res.body)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('error prosess', () => {
            test('response 200 get all user', (done) => {
                request(app)
                    .get('/users')
                    .end((err, res) => {
                        if (err) done(err)
                        console.log(res.body)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
        describe('invalid token', () => {
            test('401', (done) => {
                request(app)
                    .get('/users')
                    .set('access_token', '1')
                    .end((err, res) => {
                        if (err) done(err)
                        console.log(res.body)
                        expect(res.status).toBe(401)
                        done()
                    })
            })

        })
    })
})

