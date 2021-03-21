const {User} = require('../models')
const { comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/jwt')
class UserController {
    static async register(req, res, next) {
        try {
            const result = await User.create(req.body)
            res.status(201).json({
                msg: 'sukses register',
                id: result.id,
                email: result.email
            })
        } catch (err) {
            next(err)
        }
	}

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where:{email}})
            if(!user) throw {name:'customError', code :401,msg: 'Invalid email or password'}
            const compare = await comparePassword(password, user.password)
			if(!compare) throw {name:'customError', code :401,msg: 'Invalid email or password'}
            const access_token = generateToken({
				id:user.id,
				email:user.email,
                name:user.name
			})
			res.status(200).json({access_token})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController