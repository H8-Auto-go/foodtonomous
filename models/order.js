const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    restauran: {type: String},
    foods: [{type:String}],
    price: {
        type:Number,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
})

const Order = mongoose.model('orders', orderSchema)
module.exports = Order