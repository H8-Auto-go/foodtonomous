const FavoriteFoodController = require('../controllers/favoriteFoodController')
const history = require('./historyRoute')
const route = require('express').Router()

route.get('/', FavoriteFoodController.getAllFavoriteFoods)
route.post('/', FavoriteFoodController.addFavoriteFood)
route.get('/:id', FavoriteFoodController.getOneFavoriteFood)
route.delete('/:id', FavoriteFoodController.deleteFavoriteFood)

module.exports = route
