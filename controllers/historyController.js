const User = require("../models/user")

class HistoryController {
    static async getHistoryUser(req, res) {
        try {
            const {id} = req.user
            console.log(id);
            const user = await User.findById(id).populate('history')
            console.log(user);
            res.status(200).json(user)
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    static async addHistory(req, res) {
        try {
            const {pic, food} = req.body
            const {id} = req.user
            const user = await User.findById(id)
            user.history.push({
                pic,
                food
            })
            await user.save()

            res.status(201).json(user)
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    }

    static async removeHistory(req, res) {
        try {
            const {id} = req.user
            const user = await User.findById(id)
            const newHistory =  user.history.filter(history => history.id !== req.params.id)
            user.history = newHistory
            await user.save()
            const userNew = await User.findById(id)
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = HistoryController