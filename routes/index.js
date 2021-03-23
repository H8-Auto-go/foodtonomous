const route = require('express').Router()
const userRoutes = require('./userRoute')
const driverRoutes = require('./driverRoute')
const orderRoutes = require('./orderRoute')
const foodRoutes = require('./foodRoute')
const restaurantRoutes = require('./restaurantRoute')
const automationScheduleRoutes = require('./automationScheduleRoute')
const favoriteFoodRoutes = require('./favoriteFoodRoute')
route.get("/", (req, res) => {
    res.json({ message: "server is connecteddddd" })
})

route.use('/', userRoutes)
route.use('/', driverRoutes)
route.use('/orders', orderRoutes)
route.use('/foods', foodRoutes)
route.use('/restaurants', restaurantRoutes)
route.use('/favoriteFoods', favoriteFoodRoutes)
route.use('/automationSchedules', automationScheduleRoutes)

module.exports = route
 