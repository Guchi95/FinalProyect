const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth')
const ObjectId = require('mongodb').ObjectId;

const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/cart', isAuthenticated, async (req, res) => {
    const userId = req.session.passport.user;
    const userObjectId = ObjectId(userId)
    const UserCart = await Cart.findOne({userId:userObjectId});
    const products = await Product.find(
        {_id: {$in: UserCart.products}}
    ).lean();
    res.render('./product/cart', {products});
 });

router.post('/cart/AddProductToCart/:id', isAuthenticated, async (req, res) => {
    const userId = req.session.passport.user;
    const userObjectId = ObjectId(userId)
    const errors = [];
    const AddProductToCart = await Cart.updateOne(
        {userId: userObjectId},
        { $push: {products: req.params.id}}        
        )
        req.flash('success_msg', 'Product added to Cart successfully');
        res.redirect('/product');
});

router.post('/cart/removeProduct/:id', async (req, res) => {
    const userId = req.session.passport.user;
    const userObjectId = ObjectId(userId)
    await Cart.updateOne(
        {userId: userObjectId},
        { $pull: {products: req.params.id}}
    )
    req.flash('success_msg', 'Product removed successfully');
    res.redirect('/cart')
});


module.exports = router;