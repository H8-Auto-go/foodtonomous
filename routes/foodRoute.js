const FoodController = require('../controllers/foodController')
const history = require('./historyRoute')
const route = require('express').Router()

route.get('/', FoodController.getAllFood)
route.get('/:id', FoodController.getOneFood)

module.exports = route