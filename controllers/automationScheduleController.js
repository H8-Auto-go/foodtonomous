const {AutomationSchedule, Restaurant, Foods} = require('../models')

module.exports = class AutomationScheduleController {
    static async getForAutomation() {
        try {
            const schedules = await AutomationSchedule.findAll({where: {isActive: true}})
            return schedules.map(schedule => {
                return {id: schedule.id, time: schedule.time}
            })
        } catch(err) {
            console.log(err)
        }
    }
    static async getAllSchedules(req, res, next) {
        console.log('masuk sini');
        try {
            let userId = 0
            console.log('masuk sini 2');
            console.log(req.user)
            if (req.user) {
                 userId = +req.user.id
            } else {
                 userId = 1
            }
            const schedules = await AutomationSchedule.findAll({include: [Restaurant, Foods],where: {userId}, order: [
                ['id', 'DESC'],
            ]})
            const editedSchedules = schedules.map(({id, time, isActive, Restaurant: resto, Food: food,quantity}) => {
                return {
                    id, time, isActive,
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
                    },quantity
                }
            })
            res.status(200).json({automationSchedules: editedSchedules})
        } catch(err) {
            next(err)
        }
    }

    static async getOneSchedule(req, res, next) {
        try {
            const scheduleId = Number(req.params.id)
            const {id, time, isActive, Restaurant: resto, Food: food} = await AutomationSchedule.findOne({include: [Restaurant, Foods],where: {id: scheduleId}})
            res.status(200).json({
                id, time, isActive,
                restaurant: {
                    id: resto.id,
                    name: resto.name,
                    picture: resto.picture,
                    location: JSON.parse(resto.location)
                },
                food: {
                    id: food.id,
                    name: food.name,
                    price: food.price
                }
            })
        } catch(err) {
            next(err)
        }
    }
    static async addSchedule(req, res, next) {
        try {
            const { time, isActive, restaurantId, foodId} = req.body
            const userId = req.user?.id || 1
            const newSchedule = await AutomationSchedule.create({time, isActive, restaurantId, foodId, userId}, {returning: true})
            res.status(201).json({schedule: newSchedule})
        } catch(err) {
            next(err)
        }
    }
    static async updateRealtimeStatus({id, isActive}) {
        try {
            return await AutomationSchedule.update({isActive}, {where: {id}})
        } catch(err) {
            console.log(err)
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const scheduleId = Number(req.params.id)
            const isActive = req.body.isActive //masih harus diganti, ini buat percobaan doang
            const updatedSchedule = await AutomationSchedule.update({isActive}, {where: {id:scheduleId}})
            res.status(200).json({schedule: updatedSchedule})
        } catch(err) {
            next(err)
        }
    }
    static async deleteSchedule(req, res, next) {
        try {
            const scheduleId = Number(req.params.id)
            await AutomationSchedule.destroy({where: {id:scheduleId}})
            res.status(200).json({message: 'automation schedule deleted'})
        } catch(err) {
            next(err)
        }
    }

    static async updateQuantity(req, res, next) { 
        try {
            const id = +req.params.id
            const {quantity} = req.body
            console.log(quantity, '<<<< ini di controller')
            const updateQty = await AutomationSchedule.update({quantity}, {where:{id}})
            res.status(200).json(updateQty)
        } catch (err) {
            next(err)
        }
    }
}
