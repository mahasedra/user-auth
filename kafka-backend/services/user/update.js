const { Types } = require('mongoose');
const { getUserConnection } = require('../../dbconnections');

const handle_request = (msg, callback) => {
  const { User } = getUserConnection();

  User.updateOne({ _id: Types.ObjectId(msg.id) }, msg.data)
    .then((data) => {
      callback(null, { _id: msg.id });
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = handle_request;
