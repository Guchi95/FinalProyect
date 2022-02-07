const express = require('express');
const { removeListener } = require('../models/Product');
const router = express.Router();

const Product = require('../models/Product')
const { isAuthenticated } = require('../helpers/auth')
const { isAdmin } = require('../helpers/auth') 

router.get('/product/add', isAuthenticated, isAdmin, (req, res) => {
    res.render('./product/newProduct')
})

router.post('/product/new-Product', isAuthenticated, isAdmin, async (req, res) => {
    const { productName, description, date, code, photo, price, stock }= (req.body);
    const errors = [];
    if(!productName) {
        errors.push({text: 'Please Write a Title'});
    }
    if (!description) {
        errors.push({text: 'Please Write a Description'});
    }
    if(errors.length > 0) {
        res.render('product/newProduct', {
            errors,
            productName,
            description
        });
    } else {
    const newProduct = new Product({productName, description, date, code, photo, price, stock});        
    await newProduct.save();
    req.flash('success_msg', 'Product added successfully');
    res.redirect('/product');
    }
});

router.get('/product', isAuthenticated, async (req, res) => {
   const products = await Product.find().lean();
   res.render('./product/all-products', {products, isAdmin});
});

router.get('/product/edit/:id', isAuthenticated, isAdmin, async (req, res)=>{
    const product = await Product.findById(req.params.id).lean();
res.render('./product/edit-product', {product, isAdmin})
});

router.put('/product/edit-product/:id', isAuthenticated, isAdmin, async (req, res)=>{
    const {productName, description, code, photo, price, stock}= req.body;
    await Product.findByIdAndUpdate(req.params.id, {productName, description, code, photo, price, stock}).lean();
    req.flash('success_msg', 'Product updated successfully');
    res.redirect('/product')
});

router.delete('/product/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
await Product.findByIdAndDelete(req.params.id).lean();
req.flash('success_msg', 'Product deleted successfully');
res.redirect('/product')
});



module.exports = router;