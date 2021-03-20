const {Foods} = require('../models')


module.exports = class FoodController {
    static async getAllFoods(req, res, next) {
        try {
            console.log('masuk')
            const foods = await Foods.findAll()
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
