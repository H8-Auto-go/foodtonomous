const FavoriteFoodController = require('../controllers/favoriteFoodController')
const auth = require('../midlewares/auth')
const route = require('express').Router()
route.use(auth)
route.get('/', FavoriteFoodController.getAllFavoriteFoods)
route.post('/', FavoriteFoodController.addFavoriteFood)
route.get('/:id', FavoriteFoodController.getOneFavoriteFood)
route.delete('/:id', FavoriteFoodController.deleteFavoriteFood)

module.exports = route
