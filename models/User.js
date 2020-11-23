
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  friends: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  games: [{
    atlasId: String,
    name: String,
    imgUrl: String,
  }],
  allowFriends: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;