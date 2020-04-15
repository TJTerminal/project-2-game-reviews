var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// GET /users
router.get('/', gamesCtrl.index);
router.get('/new', isLoggedIn, gamesCtrl.new);

// POST /games
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post( '/', gamesCtrl.addGame);

// // DELETE /facts/:id
// router.delete('/facts/:id', studentsCtrl.delFact);


module.exports = router;
