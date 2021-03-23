const UserController = require('../controllers/userControllers')
const auth = require('../midlewares/auth')
const route = require('express').Router()

route.get('/users', auth,UserController.getUser)
route.post('/register', UserController.register)
route.post('/login/user', UserController.login)
module.exports = route
