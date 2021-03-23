const request = require('supertest');
const app = require('../app');
const { sequelize, Driver } = require("../models");



afterAll((done) => {
    sequelize.close()
    done()
})

const data = {
    "email": "amos@xavier.com",
    "password": "1234",
}

describe('driver routes', () => {
    describe('login', () => {
        test('reponse 200 when login driver ', (done) => {
            request(app)
                .post('/login/driver')
                .send(data)
                .end((err, res) => {
                    if (err) done(err)
                    expect(res.status).toBe(200)
                    done()
                })
        })

    })
})