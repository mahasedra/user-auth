const { Types } = require('mongoose');
const mongoose = require('mongoose');

const getAuthConnection = () => {
  const authConn = mongoose.createConnection(global.gConfig.auth_conn);
  authConn.set('debug', true);

  const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
    },
  });

  const User = authConn.model('users', UserSchema);

  return { authConn, User };
};

module.exports = {
  getAuthConnection,
};
