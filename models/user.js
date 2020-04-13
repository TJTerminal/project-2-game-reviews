const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: true, unique: true},
    email: {type: String},
    avatar: {type: String},
    googleId: {type: String},
    dateCreated: {type: Date}
});

module.exports = mongoose.model('User', userSchema);