const { urlencoded } = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose

const ProductSchema = new Schema({
    productName:{ type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now},
    code: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
})

module.exports = mongoose.model('Product', ProductSchema)