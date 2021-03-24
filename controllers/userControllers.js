const { User, Driver } = require('../models')
const { comparePassword } = require('../helpers/bcrypt');
const {generateToken, decodeToken} = require('../helpers/jwt')
class UserController {
    static async updateSaldo({userId, driverId, updatedUserSaldo, updatedDriverSaldo}) {
        try {
            const [user, driver] = await Promise.all([
              User.update({saldo:updatedUserSaldo},{where:{id: userId}}),
              Driver.update({saldo:updatedDriverSaldo},{where: {id:driverId}})
            ])
            return [user, driver]
        } catch(err) {
            console.log(err)
        }
    }

    static async register(req, res, next) {
        try {
            // console.log(req.body);
            if (req.body.role === 'user'){
                const result = await User.create(req.body)
                res.status(201).json({
                    msg: 'sukses register',
                    id: result.id,
                    email: result.email,
                    role: result.role
                })
            } else if (req.body.role === 'driver'){
                const result = await Driver.create(req.body)
                res.status(201).json({
                    msg: 'sukses register',
                    id: result.id,
                    email: result.email,
                    role: result.role
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async getUsers(req, res, next) {
        try {
            const data = decodeToken(req.headers.access_token)
            // console.log('dari userController',data);
            const users = await Promise.all([
                await User.findByPk(data.id),
                await Driver.findByPk(data.id)
            ])
        
        
            const parsedUser = users.map(({id, name, email, saldo, location, avatar, role}) => {
                return {
                    id, name, email, saldo, 
                    location: JSON.parse(location),
                    avatar, role
                }
            })
            console.log(parsedUser)
            res.status(200).json(parsedUser)
        } catch(err) {
            next(err)
        }
    }

    static async getUser(req, res, next) {
        try {
            const data = decodeToken(req.headers.access_token)
            console.log('dari userController',data);
            const {id, name, email, saldo, location, avatar, role} = data.role === 'user'
                ? await User.findByPk(data.id)
                : await Driver.findByPk(data.id)
            
            console.log(name, role)
            res.status(200).json({
                id, name, email, saldo,
                avatar, role,
                location: JSON.parse(location)
            })
        } catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password, location } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'customError', code: 401, msg: 'Invalid email or password' }
            const compare = await comparePassword(password, user.password)
            if (!compare) throw { name: 'customError', code: 401, msg: 'Invalid email or password' }
            const updatedLocationUser = await User.update({location: JSON.stringify(location)}, {where:{email}})
            const access_token = generateToken({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            })
            res.status(200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
