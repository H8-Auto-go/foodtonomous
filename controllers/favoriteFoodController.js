const {FavoriteFood} = require('../models')


module.exports = class FavoriteFoodController {
    static async getAllFavoriteFoods(req, res, next) {
        try {
            const {id} = req.user
            const favoriteFoods = await FavoriteFood.findAll({where:{userId:id}})
            res.status(200).json(favoriteFoods)
        } catch(err) {
            next(err)
        }
    }
    static async getOneFavoriteFood(req, res, next) {
        try {
            const id = Number(req.params.id)
            const favoriteFood = await FavoriteFood.findOne(id)
        } catch(err) {
            next(err)
        }
    }
    static async addFavoriteFood(req, res, next) {
        try {
            const newFavoriteFood = await FavoriteFood.create(req.body)
            res.status(201).json({favoriteFood: newFavoriteFood})
        } catch(err) {
            next(err)
        }
    }
    static async deleteFavoriteFood(req, res, next) {
        try {
            const favoriteFoodId = Number(req.params.id)
            const isFavoriteFoodDeleted = await FavoriteFood.destroy({where:{id:favoriteFoodId}})
            res.status(200).json({message:'Favorite food deleted'})
        } catch(err) {
            next(err)
        }
    }
}