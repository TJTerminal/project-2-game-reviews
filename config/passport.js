const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Game = require('../models/game');

passport.use(new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  (accessToken, refreshToken, profile, cb) => {
    // a user has logged in with OAuth...
    Game.findOne({ 'googleId': profile.id }, function(err, game) {
        if (err) return cb(err);
        if (game) {
          if (!game.avatar) {
            game.avatar = profile.photos[0].value;
            game.save(function(err) {
              return cb(null, game);
            });
          } else {
            return cb(null, game);
          }
        } else {
            console.log(profile);
          // we have a new student via OAuth!
          var newGame = new Game({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          newGame.save(function(err) {
            if (err) return cb(err);
            return cb(null, newGame);
          });
        }
      });
    }
));

passport.serializeUser((game, done) => {
    done(null, game.id);
});

passport.deserializeUser(function(id, done) {
    Game.findById(id, function(err, game) {
      done(err, game);
    });
  });