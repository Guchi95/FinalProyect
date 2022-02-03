const { urlencoded } = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose

const CartSchema = new Schema({
    id: {type: String, required: true},
    productName:{ type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, required: true},
    code: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
})

module.exports = mongoose.model('Cart', CartSchema)