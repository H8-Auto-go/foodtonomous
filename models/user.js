const mongoose = require('mongoose')
const {hashPassword} = require('../helpers/bcrypt')
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        requireq: true,
        trim:true,
        unique:true
    },
    password: {
        type:String,
        requireq: true
    },
    role: {
        type: String,
        default: 'User'
    }
})

UserSchema.pre('save',function() {
    const user = this
    user.password = hashPassword(user.password)
})

const User = mongoose.model('Users', UserSchema)
module.exports = User