module.exports = {
  'GET /users?(.+)': ['user', 'moderator', 'admin'],
  'POST /users': ['user'],
  'PUT /users/(.+)': ['user'],
  'DELETE /users/(.+)': ['admin'],
};
