const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = async (req, res, next) => {
    try {
        if(!req.headers.access_token) throw {name:"customErr", code:400, msg:"access token needed"}
        const decode = jwt.verify(req.headers.access_token,'amos')
        const user = await User.findOne({email:decode.email})
        console.log(user)
        if(!user) throw {name:"customErr", code:403, msg:"invalid token"}
        req.user = decode
        next()
    } catch (err) {
        next(err)
    }
}