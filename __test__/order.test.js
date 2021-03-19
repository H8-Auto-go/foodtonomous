const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')
let id;
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTRjNTRjYjNlZmY1YzdkOTI4MTVkOCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTYxNjE2ODI5M30.dDgQjWlHm3yt2xX5toIfa4Ir7ywp5uIzOsyDbk3Vjxc'
afterAll(done => {
    mongoose.connection.close()
    done()
})


describe('POST /order', () => {
    it('should response with 201 status code when craete order succeed', (done) => {
        const data = {
            "restauran": "ayam bakar pak slamet",
            "foods": ["ayam geprek", "kambing guling"],
            "price": 20000,
            "location": "tangerang"
        }

        request(app)
            .post('/order')
            .set('access_token', access_token)
            .send(data)
            .end((err, res) => {
                console.log(res.body)
                if (err) done(err)
                id = res.body._id
                console.log(id)
                expect(res.status).toBe(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('foods')
                expect(res.body).toHaveProperty('status')
                expect(res.body).toHaveProperty('restauran')
                expect(res.body).toHaveProperty('price')
                expect(typeof res.body.price).toEqual('number')
                expect(res.body).toHaveProperty('location')
                done()
            })
    })

    it('should response with 400 status code when erorr handler', (done) => {
        const data = {
            "restauran": "ayam bakar pak slamet",
            "foods": ["ayam geprek", "kambing guling"]
        }

        request(app)
            .post('/order')
            .set('access_token', access_token)
            .send(data)
            .end((err, res) => {
                console.log(res.body)
                if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('errors')
                done()
            })
    })

    it('should response with 400 status code when erorr handler', (done) => {
        const data = {
            "restauran": "ayam bakar pak slamet",
            "foods": ["ayam geprek", "kambing guling"],
            "price": 20000
        }

        request(app)
            .post('/order')
            .set('access_token', access_token)
            .send(data)
            .end((err, res) => {
                console.log(res.body)
                if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('errors')
                done()
            })
    })

    it('should response with 400 status code when not have access token', (done) => {
        const data = {
            "restauran": "ayam bakar pak slamet",
            "foods": ["ayam geprek", "kambing guling"],
            "price": 20000,
            "location": "tangerang"
        }

        request(app)
            .post('/order')
            .send(data)
            .end((err, res) => {
                console.log(res.body)
                if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('Error')
                done()
            })
    })
})




describe('PATCH /order/id', () => {
    it('should response with 200 status code when update status succeed', (done) => {
        request(app)
            .patch(`/order/${id}`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                done()
            })
    })

    it('should response with 404 status code when order not found', (done) => {
        request(app)
            .patch(`/order/605462aedf696474b596e1e2`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                console.log(res.body);
                expect(res.status).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('Error')
                expect(res.body).toHaveProperty('Error','order not found')
                done()
            })
    })
})

describe('DELETE /order/id', () => {
    it('should response with 200 status code when delete order succeed', (done) => {
        request(app)
            .delete(`/order/${id}`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                done()
            })
    })

    it('should response with 404 status code when delete order not found', (done) => {
        request(app)
            .delete(`/order/605462aedf696474b596e1e2`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
                console.log(res.body);
                expect(res.status).toEqual(404)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('Error')
                expect(res.body).toHaveProperty('Error', 'order not found')
                done()
            })
    })
})