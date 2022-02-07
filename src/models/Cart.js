const { urlencoded } = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose

const CartSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products:[{type: mongoose.Schema.Types.ObjectId, ref : 'Product'}],
    date: { type: Date, default: Date.now}    
})

module.exports = mongoose.model('Cart', CartSchema) 