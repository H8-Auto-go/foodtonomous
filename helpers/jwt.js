const jwt = require('jsonwebtoken');
module.exports = (payload) => {
    return jwt.sign(payload, 'amos')
}