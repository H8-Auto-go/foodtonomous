const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = (req, res, next) => {
    try {
        if(!req.headers.access_token) throw {name:"customErr", code:400, msg:"access token needed"}
        const decode = jwt.verify(req.headers.access_token,'amos')
        const user = User.findOne({email:decode.email})
        if(!user) throw {name:"customErr", code:403, msg:"invalid token"}
        req.user = decode
    } catch (err) {
        next(err)
    }
}