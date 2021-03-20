const {FavoriteFood, Restaurant, Foods, User} = require('../models')


module.exports = class FavoriteFoodController {
    static async getAllFavoriteFoods(req, res, next) {
        try {
            const userId = /*req.user*/ 1
            const favoriteFoods = await FavoriteFood.findAll({where:{userId}, include: [Restaurant, Foods]})
            res.status(200).json(favoriteFoods.map(({id, Restaurant: resto, Food: food}) => {
                return {
                    id,
                    restaurant: {
                        id: resto.id,
                        name: resto.name,
                        picture: resto.picture,
                        location: JSON.parse(resto.location)
                    },
                    food: {
                        id: food.id,
                        name: food.name,
                        price: food.price,
                        picture: food.picture
                    }
                }
            }))
        } catch(err) {
            next(err)
        }
    }
    static async getOneFavoriteFood(req, res, next) {
        try {
            const id = Number(req.params.id)
            const {User:user, Restaurant:resto, Food:food} = await FavoriteFood.findOne({where:{id}, include: [User, Restaurant, Foods]})
            res.status(200).json({
                id,
                user: {
                    id: user.id,
                    user: user.name,
                    email: user.email
                },
                restaurant: {
                    id: resto.id,
                    name: resto.name,
                    picture: resto.picture,
                    location: JSON.parse(resto.location)
                },
                food: {
                    id: food.id,
                    name: food.name,
                    price: food.price,
                    picture: food.picture
                }
            })
        } catch(err) {
            next(err)
        }
    }
    static async addFavoriteFood(req, res, next) {
        try {
            const {restaurantId, foodId} = req.body
            const userId = /*req.user.id*/1 //for testing purpose
            const newFavoriteFood = await FavoriteFood.create({userId, restaurantId, foodId})
            res.status(201).json({favoriteFood: newFavoriteFood})
        } catch(err) {
            next(err)
        }
    }
    static async deleteFavoriteFood(req, res, next) {
        try {
            const favoriteFoodId = Number(req.params.id)
            await FavoriteFood.destroy({where:{id:favoriteFoodId}})
            res.status(200).json({message:'Favorite food deleted'})
        } catch(err) {
            next(err)
        }
    }
}
