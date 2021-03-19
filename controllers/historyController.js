const User = require("../models/user")

class HistoryController {
    static async getHistoryUser(req, res, next) {
        try {
            const {id} = req.user
            const user = await User.findById(id).populate('history')
            if(!user) throw {name: 'customErr', code:404, msg:'user not found'}
            const {role, _id, email, history} = user
            res.status(200).json({
                role,
                _id,
                email,
                history
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async addHistory(req, res, next) {
        try {
            const {pic, food} = req.body
            const {id} = req.user
            const user = await User.findById(id)
            if(!user) throw {name: 'customErr', code:404, msg:'user not found'}
            user.history.push({
                pic,
                food
            })
            await user.save()

            res.status(201).json(user)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async removeAllHistory(req, res, next) {
        try {
            const {id} = req.user
            const user = await User.findById(id)
            if(!user) throw {name: 'customErr', code:404, msg:'user not found'}
            user.history = []
            await user.save()
            const {role, _id, email, history} = user
            res.status(200).json({role, _id, email, history})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = HistoryController