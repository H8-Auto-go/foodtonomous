const DriverController = require('../controllers/driverController')

const route = require('express').Router()

route.post('/login/driver', DriverController.login)

module.exports = route