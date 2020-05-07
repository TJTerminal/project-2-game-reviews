var express = require('express');
var router = express.Router();
var reviewsCtrl = require('../controllers/reviews');

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

router.post('/games/:id/reviews', isLoggedIn, reviewsCtrl.create);


module.exports = router;