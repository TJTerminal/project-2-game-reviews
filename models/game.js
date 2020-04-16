const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 10},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  }, {
    timestamps: true
  });

const gameSchema = new Schema({
    name: {type: String, require: true},
    developer: {type: String, require: true},
    publisher: {type: String, require: true},
    platform: {type: String, require: true},
    releaseDate: {type: String, require: true},
    genre: {type: String},
    reviews: [reviewSchema],
    user: [{
      type: Schema.Types.ObjectId,
      ref: 'User'}],
    avg: {type: Number}
});

module.exports = mongoose.model('Game', gameSchema);