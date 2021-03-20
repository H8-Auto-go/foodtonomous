const {AutomationSchedule, Restaurant, Food} = require('../models')

module.exports = class AutomationScheduleController {
    static async getAllSchedules(req, res, next) {
        try {
            const {id} = req.user
            const schedules = await AutomationSchedule.findAll({include: [Restaurant, Food],where: {userId: id}})
            res.status(200).json({automationSchedules: schedules})
        } catch(err) {
            next(err)
        }
    }

    static async getOneSchedule(req, res, next) {
        try {
            const scheduleId = Number(req.params.id)
            const schedule = await AutomationSchedule.findOne({include: [Restaurant, Food],where: {id: scheduleId}})
            res.status(200).json({automationSchedule: schedule})
        } catch(err) {
            next(err)
        }
    }
    static async addSchedule(req, res, next) {
        try {
            const {restaurantId, foodId} = req.body
            const newSchedule = await AutomationSchedule.create({restaurantId, foodId}, {returning: true})
            res.status(201).json({schedule: newSchedule})
        } catch(err) {
            next(err)
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const scheduleId = Number(req.params)
            const {isActive} = req.body
            const updatedSchedule = await AutomationSchedule.update({isActive}, {where: {id:scheduleId}})
            res.status(200).json({schedule: updatedSchedule})
        } catch(err) {
            next(err)
        }
    }
    static async deleteSchedule(req, res, next) {
        try {
            const scheduleId = Number(req.params)
            const isScheduleDeleted = await AutomationSchedule.destroy({where: {id:scheduleId}})
            res.status(200).json({message: 'automation schedule deleted'})
        } catch(err) {
            next(err)
        }
    }
}