const {Restaurant, Foods} = require('../models')


class RestaurantController {
    static async getAllRestaurant(req, res, next) {
        try {
            const restaurants = await Restaurant.findAll({include:Foods})
            res.status(200).json(restaurants.map(({id, name, picture, location, Foods}) => {
                return {
                    id, name, picture,
                    location: JSON.parse(location),
                    foods: Foods.map(food => {
                        return {
                            id: food.id,
                            name: food.name,
                            picture: food.picture,
                            price: food.price
                        }
                    })
                }
            }))
        } catch (err) {
            next(err)
        }
    }
    static async getOneRestaurant(req, res, next) {
        try {
            const restaurantId = Number(req.params.id)
            const {id, name, picture, location, Foods: foods} = await Restaurant.findOne({where:{id:restaurantId}, include: Foods})
            res.status(200).json({
                id, name, picture,
                location: JSON.parse(location),
                foods: foods.map(food => {
                    return {
                        id     : food.id,
                        name   : food.name,
                        picture: food.picture,
                        price  : food.price
                    }
                })
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = RestaurantController
