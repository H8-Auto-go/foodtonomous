const jwt = require('jsonwebtoken')
const {User, Driver} = require('../models/')
module.exports = async (req, res, next) => {
    try {
        console.log(req.headers.access_token);
        if(!req.headers.access_token) throw {name:"customError", code:400, msg:"access token needed"}
        const decode = jwt.verify(req.headers.access_token,'amos')
        console.log(decode)
        let user = await User.findOne({where:{email:decode.email}})
        if(!user) {
            user = await Driver.findOne({where:{email:decode.email}})
        }
        if(!user) throw {name:"customError", code:403, msg:"invalid token"}
        req.user = decode
        next()
    } catch (err) {
        next(err)
    }
}