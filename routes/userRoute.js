const UserController = require('../controllers/userControllers')

const route = require('express').Router()

// route.get('/', UserController.getAll)
route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports = route