const request = require('supertest');
const app = require('../app')
const {generateToken} = require('../helpers/jwt')
const { sequelize, User, Driver } = require("../models");
const { queryInterface } = sequelize

let id
let token


afterAll((done) => {
    queryInterface.bulkDelete('Users', {})
        .then(_ => done())
        .catch(err => done(err))
})


describe('restaurant and food route', () => {
    describe('get restaurant', () => {
        describe('prosess success', () => {
            test('should ', (done) => {
                request(app)
                .get('/restaurants')
                .end((err, res) => {
                    if(err) done(err)
                    expect(res.status).toBe(200)
                    done()
                })
            })
            test('should ', (done) => {
                request(app)
                .get('/restaurants/1')
                .end((err, res) => {
                    if(err)done(err)
                    expect(res.status).toBe(200)
                    done()
                })
            })
            
        })
    })
    describe('get food', () => {
        describe('prosess success', () => {
            test('should ', (done) => {
                request(app)
                .get('/foods')
                .end((err, res) => {
                    if(err)done(err)
                    expect(res.status).toBe(200)
                    done()
                })
            })
            test('should ', (done) => {
                request(app)
                .get('/foods/1')
                .end((err, res) => {
                    if(err)done(err)
                    expect(res.status).toBe(200)
                    done()
                })
            })
            
        })
    })
})