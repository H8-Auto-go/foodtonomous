const { Driver } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
class DriverController {
    static async login(req, res, next) {
        try {
            const { email, password, location } = req.body
            // console.log(location);
            const driver = await Driver.findOne({ where: { email } })
            // if (!driver) throw { name: 'customError', code: 401, msg: 'Invalid email or password' }
            const compare = await comparePassword(password, driver.password)
            // if (!compare) throw { name: 'customError', code: 401, msg: 'Invalid email or password' }
            
            const updatedLocationDriver = await Driver.update({location: JSON.stringify(location)}, {where:{email}})
            const access_token = generateToken({
                id: driver.id,
                email: driver.email,
                name: driver.name,
                role: driver.role
            })
            res.status(200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = DriverController
