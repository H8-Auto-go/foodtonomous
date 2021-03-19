const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTRjN2U5OTRmZjdlY2NiN2VlOWQyYiIsImVtYWlsIjoiYW1vc0BtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjE2MTc0MjI0fQ.edMrewcHn6bByD-RmTO9shYW_-fzeDgg9hhlsSu13ao'
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTRmNTllZmVmNjUwZjdmMDYxYTU4YiIsImVtYWlsIjoiYW1vczFAbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTYxNjE4MDY1MH0.SVm9kHCYQquHwV-oqDyzYqAj016WDTg-XmAlDTs6PUk'


afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('GET /users/history', () => {
    it('should response with 200 status code when get user history', (done) => {
        request(app)
        .get('/users/history')
        .set('access_token', token)
        .end((err, res) => {
            if(err) done(err)
            
            expect(res.status).toBe(200)
            expect(typeof res.body).toBe('object')
            done()
        })
    })

    it('should response with 404 status code when user not found', (done) => {
        request(app)
        .get('/users/history')
        .set('access_token', fakeToken)
        .end((err, res) => {
            if(err) done(err)
            
            expect(res.status).toBe(404)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('Error')
            expect(res.body).toHaveProperty('Error', 'user not found')
            done()
        })
    })

    it('should response with 400 status code when not have access token', (done) => {
        request(app)
        .get('/users/history')
        .end((err, res) => {
            if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('Error')
                done()
        })
    })
})


describe('POST /users/history', () => {
    it('should response with 201 status code when succes create history', (done) => {
        const data = {
            pic: "inih gambar",
            food: "nasi goreng"
        }
        request(app)
        .post('/users/history')
        .set('access_token', token)
        .send(data)
        .end((err, res) => {
            if(err) done(err)
            expect(res.status).toBe(201)
            expect(typeof res.body).toBe('object')
            done()
        })

    })

    it('should response with 404 status code when user not found', (done) => {
        request(app)
        .post('/users/history')
        .set('access_token', fakeToken)
        .end((err, res) => {
            if(err) done(err)
            
            expect(res.status).toBe(404)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('Error')
            expect(res.body).toHaveProperty('Error', 'user not found')
            done()
        })
    })

    it('should response with 400 status code when not have access token', (done) => {
        request(app)
        .post('/users/history')
        .end((err, res) => {
            if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('Error')
                done()
        })
    })
})


describe('DELETE /users/history/', () => {
    it('should response with 200 status code when delete all history ', (done) => {
        request(app)
        .delete('/users/history')
        .set('access_token', token)
        .end((err, res) => {
            if(err) done(err)
            
            expect(res.status).toBe(200)
            expect(typeof res.body).toBe('object')
            done()
        })
    })

    it('should response with 404 status code when user not found', (done) => {
        request(app)
        .delete('/users/history')
        .set('access_token', fakeToken)
        .end((err, res) => {
            if(err) done(err)
            
            expect(res.status).toBe(404)
            expect(typeof res.body).toBe('object')
            expect(res.body).toHaveProperty('Error')
            expect(res.body).toHaveProperty('Error', 'user not found')
            done()
        })
    })

    it('should response with 400 status code when not have access token', (done) => {
        request(app)
        .delete('/users/history')
        .end((err, res) => {
            if (err) done(err)
                expect(res.status).toBe(400)
                expect(typeof res.body).toBe('object')
                expect(res.body).toHaveProperty('Error')
                done()
        })
    })
})