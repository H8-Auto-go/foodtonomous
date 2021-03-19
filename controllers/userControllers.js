const validation = require('validator');
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt')
const User = require('../models/user')
class UserController {
    static async register(req, res, next) {
        try {
            const {email, password} = req.body
            if(validation.isEmail(email)){
                const user = new User({email, password})
                await user.save()
                res.status(201).json({msg:`success register your email ${user.email}`})
            }else{
                throw {name:"customErr", code:400, msg:"invalid email format"}
            }
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) throw {name:"customErr", code:404, msg:"invalid email password"}
            if(!comparePassword(password, user.password)) throw {name:"customErr", code:404, msg:"invalid email password"}
            const token = generateToken({
                id: user._id,
                email: user.email,
                role: user.role
            })
            res.status(200).json({token})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController