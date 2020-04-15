var router = require('express').Router();
var passport = require('passport');

// Google OAuth login route
router.get(
  '/auth/google',
passport.authenticate('google', { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback',
passport.authenticate('google',
  {
    successRedirect : '/games',
    failureRedirect : '/games'
  }
));

 // OAuth logout route
 router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/games');
});

module.exports = router;