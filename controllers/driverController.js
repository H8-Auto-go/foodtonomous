const { Driver } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
class DriverController {
    static async login(req, res, next) {
        try {
            const { email, password, location } = req.body
            const driver = await Driver.findOne({ where: { email } })
            const compare = await comparePassword(password, driver.password)

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
