const route = require('express').Router()
const User = require('./userRoute')
route.use('/users',User)

module.exports = route