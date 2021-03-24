const RestaurantController = require('../controllers/restaurantController')
const route = require('express').Router()

route.get('/', RestaurantController.getAllRestaurant)
route.get('/:id', RestaurantController.getOneRestaurant)


module.exports = route