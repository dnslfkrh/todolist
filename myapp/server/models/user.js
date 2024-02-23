const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    unique: true, 
  },
  user_email: {
    type: String,
    require: true,
    unique: true,
  },
  user_pw: String,
  confirm_pw: String
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
