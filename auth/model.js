const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['customer', 'restaurant', 'admin', 'moderator', 'client'],
  },
});

const User = model('users', UserSchema);

module.exports = { User };
