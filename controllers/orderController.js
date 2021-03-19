const Order = require("../models/order")

class OrderController {
    static async addOrder(req, res) {
        try {
            const order = new Order(req.body)
            await order.save()
            res.status(201).json(order)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async getOrder(req, res, next) {
        try {
            const orders = await Order.find()
            res.status(200).json(orders)
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const order = await Order.findById(req.params.id)
            if(!order) throw {name:"customErr", code:404, msg:"order not found"}
            res.status(200).json({msg:'Success update status'})
        } catch (err) {
            next(err)
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id)
            if(!order) throw {name:"customErr", code:404, msg:"order not found"}
            res.status(200).json({msg: 'Success delete order'})
        } catch (err) {
            next(err)
        }
    }
}


module.exports = OrderController