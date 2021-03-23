const request = require('supertest');
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize
let token
let id
let idUser
beforeAll(async done => {
    try {
        await User.create({
            email: 'agung1@mail.com',
            password: '123',
            role: 'user'
        })
        const user = await User.findOne({
            where: {
                email: 'agung1@mail.com'
            }
        })
        idUser = user.id
        token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        })
        done()
    } catch (err) {
        done(err)
    }

})

afterAll((done) => {
    User.destroy({where:{id:idUser}})
        .then(_ => {
            return queryInterface.bulkDelete('AutomationSchedules', {})
        })
        .then(_ => done())
        .catch(err => done(err))
})

const data = {
    "time": "08.00",
    "isActive": false,
    "restaurantId": 1,
    "foodId": 1
}

describe('schedule route', () => {
    describe('schedule post', () => {
        describe('prosess succsess', () => {
            test('should ', (done) => {
                request(app)
                .post('/automationSchedules')
                .set('access_token', token)
                .send(data)
                .end((err, res) => {
                    console.log(res.body.schedule,'===========================');
                    id = res.body.schedule.id
                    if(err) done(err)
                    expect(res.status).toBe(201)
                    done()
                })
            })
        })
    })
    describe('schedule get', () => {
        test('should ', (done) => {
            request(app)
            .get('/automationSchedules')
            .set('access_token', token)
            .end((err, res) => {
                if(err) done(err)
                expect(res.status).toBe(200)
                done()
            })
        })

        test('should ', (done) => {
            request(app)
            .get(`/automationSchedules/${id}`)
            .set('access_token', token)
            .end((err, res) => {
                if(err)done(err)
                expect(res.status).toBe(200)
                done()
            })
        })
    })

    describe('schedule patch update status', () => {
        const data = {
            isActive:true
        }
        test('should ', (done) => {
            request(app)
            .patch(`/automationSchedules/${id}`)
            .set('access_token', token)
            .send(data)
            .end((err, res) => {
                if(err)done(err)
                expect(res.status).toBe(200)
                done()
            })
        })
    })

    describe('schedule delete', () => {
        test('should ', (done) => {
            request(app)
            .delete(`/automationSchedules/${id}`)
            .set('access_token', token)
            .end((err, res) => {
                if(err)done(err)
                expect(res.status).toBe(200)
                done()
            })
        })
        
    })
})