const request = require('supertest');
const app = require('../app')
const { sequelize, FavoriteFood, User } = require('../models');
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let token
let id
let idUser
beforeAll(async done => {
    try {
        await User.create({
            email: 'agung@mail.com',
            password: '123',
            role: 'user'
        })
        const user = await User.findOne({
            where: {
                email: 'agung@mail.com'
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
            return queryInterface.bulkDelete('FavoriteFoods', {})
        })
        .then(_ => done())
        .catch(err => done(err))
})

describe('favoriteFood route', () => {
    describe('post favorite food', () => {
        describe('prosess succes', () => {
            test('should ', (done) => {
                const data = {
                    restaurantId: 1,
                    foodId: 1
                }
                console.log(token);
                request(app)
                    .post('/favoriteFoods')
                    .set('access_token', token)
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err)
                        id = res.body.favoriteFood.id
                        console.log(res.body);
                        console.log(id);
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
    })
    describe('get favorite food', () => {
        describe('prosess success', () => {
            test('should', (done) => {
                request(app)
                    .get('/favoriteFoods')
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.status).toBe(200)
                        done()
                    })
            })
            test('should ', (done) => {
                request(app)
                    .get(`/favoriteFoods/${id}`)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })

    describe('delete favorite food', () => {
        describe('prossess success', () => {
            test('should ', (done) => {
                request(app)
                    .delete(`/favoriteFoods/${id}`)
                    .set('access_token', token)
                    .end((err, res) => {
                        if (err) done(err)

                        expect(res.status).toBe(200)
                        done()
                    })
            })

        })
    })
})