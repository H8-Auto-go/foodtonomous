const route = require('express').Router()
const User = require('./userRoute')
const Order = require('./orderRoute')
route.get("/", (req, res) => {
    console.log("iya terhubung")
    res.json({ message: "server is connected" })
})
route.use('/users',User)
route.use('/order',Order)
module.exports = route