const FoodController = require('../controllers/foodController')
const route = require('express').Router()

route.get('/', FoodController.getAllFoods)
route.get('/:id', FoodController.getOneFood)

module.exports = route
