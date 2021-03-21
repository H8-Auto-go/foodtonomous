const UserController = require('../controllers/userControllers')
const history = require('./historyRoute')
const route = require('express').Router()

route.get('/users', UserController.getUser)
route.post('/register', UserController.register)
route.post('/login/user', UserController.login)
route.use(history)
module.exports = route
