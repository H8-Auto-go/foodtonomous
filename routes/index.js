const route = require('express').Router()
const User = require('./userRoute')
const Order = require('./orderRoute')
route.use('/users',User)
route.use('/order',Order)
module.exports = route