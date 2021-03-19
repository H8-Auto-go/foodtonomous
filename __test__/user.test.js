const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')

afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('POST /login', () => {
    it('should response with 200 status code when login succeed', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: '1234'
        }

        request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('token')
                done()
            })
    })

    it('should response with 404 status code when user / email wrong', (done) => {
        const body = {
            email: 'adn@mail.com',
            password: 'amos'
        }

        request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toBe(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('Error');
                expect(res.body).toHaveProperty('Error', 'invalid email password');
                done()
            })
    })

    it('should response with 404 status code when user / email wrong', (done) => {
        const body = {
            email: 'admin@mail.com',
            password: 'amosww'
        }

        request(app)
            .post('/users/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toBe(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('Error');
                expect(res.body).toHaveProperty('Error', 'invalid email password');
                done()
            })
    })
})

describe('POST /register', () => {
    it('should response with 201 status code when user register', (done) => {
        const data = {
            email: 'amos1@mail.com',
            password:'amos'
        }

        request(app)
        .post('/users/register')
        .send(data)
        .end((err, res) => {
            if(err) throw done(err)
            expect(res.status).toBe(201)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('msg')
            expect(res.body).toHaveProperty('msg', `success register your email ${data.email}`)
            done()
        })
    })

    it('should response with 400 status code when user register email alraedy exist', (done) => {
        const data = {
            email: 'amos1@mail.com',
            password:'amos'
        }

        request(app)
        .post('/users/register')
        .send(data)
        .end((err, res) => {
            if(err) throw done(err)
            expect(res.status).toBe(400)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('err')
            expect(res.body).toHaveProperty('err', 'Email alraedy exist!')
            done()
        })
    })

    it('should response with 400 status code when invalid format email', (done) => {
        const data = {
            email: 'amosmail.com',
            password:'amos'
        }

        request(app)
        .post('/users/register')
        .send(data)
        .end((err, res) => {
            if(err) throw done(err)
            console.log(res.body);
            expect(res.status).toBe(400)
            expect(typeof res.body).toBe('object')
            // expect(res.body).toHaveProperty('Erorr')
            // expect(res.body).toHaveProperty('Erorr', 'invalid email format')
            done()
        })
    })
    
})