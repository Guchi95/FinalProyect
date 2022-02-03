const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth')

const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/cart', isAuthenticated, async (req, res) => {
    const productInCart = await Cart.find().lean();
    res.render('./product/cart', {productInCart});
 });

router.post('/cart/AddProductToCart/:id', isAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id);
    const { id, productName, description, date, code, photo, price, stock } = (product);
    const errors = [];
        const newCart = new Cart({ id, productName, description, date, code, photo, price, stock });
        await newCart.save();
        req.flash('success_msg', 'Product added to Cart successfully');
        res.redirect('/product');
});

router.delete('/cart/removeProduct/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Product removed successfully');
    res.redirect('/cart')
});


module.exports = router;