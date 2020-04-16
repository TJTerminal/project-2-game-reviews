var Game = require('../models/game');

const create = (req, res) => {
  console.log('working! create function');
  Game.findById(req.params.id, function(err, game) {
    game.reviews.push(req.body);
    game.save(function(err) {
      res.redirect(`/games/${game._id}`);
    });
  });
}

module.exports = {
  create
};