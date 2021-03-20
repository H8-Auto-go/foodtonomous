const {Restaurant, Food} = require('../models')


class RestaurantController {
    static async getAllRestaurant(req, res, next) {
        try {
            const results = await Restaurant.findAll({include:Food})
            res.status(200).json(results)
        } catch (err) {
            next(err)
        }
    }
    static async getOneRestaurant(req, res, next) {
        try {
            const restaurantId = Number(req.params.id)
            const restaurant = await Restaurant.findOne({where:{id:restaurantId}})
            res.status(200).json({restaurant})
        } catch(err) {
            next(err)
        }
    }
}

module.exports = RestaurantController