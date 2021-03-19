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
            password: 'amos'
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
                done()
            })
    })
})