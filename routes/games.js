var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// GET /users
router.get('/', gamesCtrl.index);
router.get('/new', isLoggedIn, gamesCtrl.new);
router.get('/:id', gamesCtrl.show); // const show
// Edit
router.get("/:id/edit", gamesCtrl.edit);
router.put("/:id", gamesCtrl.update);

// POST /games
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post( '/', gamesCtrl.addGame);
// DELETE
router.delete('/:id', gamesCtrl.delGame);
// EDIT


module.exports = router;