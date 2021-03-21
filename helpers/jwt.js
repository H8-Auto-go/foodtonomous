const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    return jwt.sign(payload, 'amos')
}

const decodeToken = (token) => {
    return jwt.verify(token,'amos')
}

module.exports = {
    generateToken,
    decodeToken
}
