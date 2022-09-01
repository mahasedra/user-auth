module.exports = {
  'POST /auth?(.+)': ['client', 'moderator', 'admin'],
  'GET /auth?(.+)': ['client', 'moderator', 'admin'],
  'GET /users?(.+)': ['client', 'moderator', 'admin'],
  'POST /users': ['client'],
  'PUT /users/(.+)': ['client'],
  'DELETE /users/(.+)': ['admin'],
};
