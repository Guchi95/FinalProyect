const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Unauthorized');
    res.redirect('/users/signin')
};

helpers.isAdmin = async (req, res, next) => {
    const userId = req.session.passport.user;
    const userObjectId = ObjectId(userId);
    const user = await User.findOne({"_id": userObjectId});
    if(user.isAdmin) {
        return next();
    }
    req.flash('error_msg', 'Unauthorized');
    res.redirect('/product')
};

module.exports = helpers;