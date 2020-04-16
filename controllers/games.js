const Game = require('../models/game');

const index = (req, res, next) => {
    Game.find({}, (err, games) => {
      games.forEach((game) => {
        var avg = 0
      game.reviews.forEach((review) => {
        avg += review.rating
      })
      avg = avg/game.reviews.length;
      game.avg = avg
      game.save()
      })
      
      console.log(games)
      res.render('games/index', {
        title: 'Games Index',
        games,
        user: req.user,
      })
  })
}

const show = (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    res.render('games/show', {
      title: 'Game Detail',
      game,
      user: req.user
  })
  })
}

const newGame = (req, res, next) => {
  res.render('games/new', {
    title: 'Add Game',
    user: req.user
  })
}

const addGame = (req, res, next) => {
  console.log(req.body)
  var game = new Game(req.body);
  game.save((err) => {
    if (err) {
      console.log(err)
      return res.redirect('/games/new')
  }
    res.redirect('/games');
  })
  
}

const delGame = (req, res) => {
  Game.findByIdAndRemove(req.params.id, function(err) {
      res.redirect('/games');
  });
}

  module.exports = {
    index,
    show,
    new: newGame,
    addGame,
    delGame
  };