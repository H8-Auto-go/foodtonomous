const {Food} = require('../models')


module.exports = class FoodController {
    static async getAllFood(req, res, next) {
        try {
            const foods = await Food.findAll()
            res.status(200).json(foods)
        } catch(err) {
            next(err)
        }
    }
    static async getOneFood(req, res, next) {
        try {
            const foodId = Number(req.params.id)
            const food = await Food.findOne({where:{id:foodId}})
            res.status(200).json(food)
        } catch(err) {
            next(err)
        }
    }
}