const UserController = require('../controllers/userControllers')
const route = require('express').Router()

route.get('/users', UserController.getUser)
route.get('/users', UserController.getUsers)
route.post('/register', UserController.register)
route.post('/login/user', UserController.login)
module.exports = route
