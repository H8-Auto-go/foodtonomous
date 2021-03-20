const {Foods, Restaurant} = require('../models')


module.exports = class FoodController {
    static async getAllFoods(req, res, next) {
        try {
            const foods = await Foods.findAll({include: Restaurant})
            const updatedFoods = foods.map(({id, name, price, picture, Restaurant}) => {
                return {
                    id, name, price, picture,
                    restaurant: {
                        id: Restaurant.id,
                        name: Restaurant.name,
                        picture: Restaurant.picture,
                        location: JSON.parse(Restaurant.location)
                    }
                }
            })
            res.status(200).json(updatedFoods)
        } catch(err) {
            next(err)
        }
    }
    static async getOneFood(req, res, next) {
        try {
            const foodId = Number(req.params.id)
            const {id, name, price, Restaurant: resto} = await Foods.findOne({where:{id:foodId}, include: Restaurant})
            res.status(200).json({
                id, name, price,
                restaurant: {
                    id      : resto.id,
                    name    : resto.name,
                    picture : resto.picture,
                    location: JSON.parse(resto.location)
                }
            })
        } catch(err) {
            next(err)
        }
    }
}
