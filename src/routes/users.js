const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('./users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/product',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup', (req, res) => {
    res.render('./users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    console.log(req.body);
    if(name.length <=3) {
        errors.push({text: 'Please insert a valid name'});
    }
    if(password != confirm_password) {
        errors.push({text: 'Password does not match'});
    }
    if(password.length < 7) {
        errors.push({text: 'Password must be at least 8 characters'});
    }
    if(errors.length > 0) {
        res.render('./users/signup', {errors, name, email, password, confirm_password})
    } else {
    const emailUser = await User.findOne({email: email})
    if(emailUser) {
        req.flash('error_msg', 'This email is already in use');
        res.redirect('/users/signup');
    }
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();   
    req.flash('success_msg', 'You are registered');
    res.redirect('/users/signin') 
    }
});

router.get('/users/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
})

module.exports = router;