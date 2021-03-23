const RestaurantController = require('../controllers/restaurantController')
const auth = require('../midlewares/auth')
const route = require('express').Router()

route.get('/', RestaurantController.getAllRestaurant)
route.get('/:id', RestaurantController.getOneRestaurant)


module.exports = route