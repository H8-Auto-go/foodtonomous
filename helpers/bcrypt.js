const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, dataBasePass) => {
    return bcrypt.compareSync(password, dataBasePass);
}

module.exports ={hashPassword, comparePassword}