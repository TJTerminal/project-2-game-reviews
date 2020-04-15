const Game = require('../models/game');

const index = (req, res, next) => {
    Game.find({}, (err, games) => {
      res.render('games/index', {
        title: 'Games Index',
        games,
        user: req.user
      })
  })
}

const show = (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    res.render('games/show', {
      title: 'Game Detail',
      game})
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
      
  } ;
    
    res.redirect('/games');
  })
  
}

  module.exports = {
    index,
    show,
    new: newGame,
    addGame

    // addFact,
    // delFact
  };