const {Order, User, Driver, Restaurant, Foods} = require('../models')

class OrderController {
    static async addOrder(req, res) {
        try {
            const {restaurantId, foodId } = req.body
            const {id} = res.user
            const order = await Order.create({
                restaurantId,
                foodId,
                userId: id,
            })
            res.status(201).json(order)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async addOrderDriver(req, res, next){
        try {
            const orderId = +req.params.id
            const {id} = req.user
            const apdatedOrder = await Order.update({
                driverId:id
            },{where:{id:orderId}})
            res.status(200).json(apdatedOrder)
        } catch (err) {
            next(err)
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

    static async updateStatus(req, res, next) {
        try {
            const orderId = +req.params.id
            const updateStatus = await Order.update({status:req.body}, {where:{id:orderId}})
            res.status(200).json(updateStatus)
        } catch (err) {
            next(err)
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const orderId = +req.params.id
            if(!order) throw {name:"customErr", code:404, msg:"order not found"}
            res.status(200).json({msg: 'Success delete order'})
        } catch (err) {
            next(err)
        }
    }
}


module.exports = OrderController
