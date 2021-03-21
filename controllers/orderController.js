const {Order, User, Driver, Restaurant, Foods} = require('../models')

class OrderController {
    static async createOrder({userId, foodId, restaurantId}) {
        try {
            const {id} = await Order.create({
                status: 'pending',
                restaurantId,
                foodId,
                userId,
            })
            return await Order.findByPk(id, {include: [User, Foods, Restaurant]})
        } catch (err) {
            console.log(err)
        }
    }

    static async addOrderDriver({ id, driverId }){
        try {
            return await Order.update({
                status: 'on going',
                driverId
            }, {where: {id}, returning: true})
        } catch (err) {
            console.log(err)
        }
    }

    static async getOrder(req, res, next) {
        try {
            const id = Number(req.params.id) || 1
            const {status, User: user, Driver: driver, Restaurant: resto, Food: food} = await Order.findOne({where: {id}, include: [User, Driver, Restaurant, Foods]})
            res.status(200).json({
                id, status,
                user: {
                    id: user.id,
                    name: user.name,
                    saldo: user.saldo,
                    avatar: user.avatar,
                    location: JSON.parse(user.location)
                },
                driver: {
                    id: driver.id,
                    name: driver.name,
                    saldo: Number(driver.saldo),
                    avatar: driver.avatar,
                    location: JSON.parse(driver.location)
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
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus({status, id}) {
        try {
            return await Order.update({status}, {where: {id}})
        } catch (err) {
            console.log(err)
        }
    }

    static async patchLocation(req, res, next) {
        try {
            const orderId = +req.params.id
            const {lat, long} = req.body
            const location = JSON.stringify({lat, long})
            const {driverId} = await Order.findByPk(orderId)
            await Driver.update({location}, {where: {id: driverId}})
            res.status(200).json({message: "location updated"})
        } catch(err) {
            next(err)
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const orderId = +req.params.id
            await Order.destroy({where: {id:orderId}})
            res.status(200).json({message: 'Success delete order'})
        } catch (err) {
            next(err)
        }
    }
}


module.exports = OrderController
