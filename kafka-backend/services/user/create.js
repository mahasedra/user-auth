const { getUserConnection } = require('../../dbconnections');

const handle_request = (msg, callback) => {
  const { User } = getUserConnection();

  User.create(msg)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = handle_request;
