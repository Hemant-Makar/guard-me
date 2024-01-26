const UserController = require('./controllers/users.controller');

exports.routesConfig = (app) => {
  // Create user
  app.post('/api/users/register', [UserController.insert]);

  // Get all user list
  app.get('/api/users', [UserController.list]);

  // Get the user by id
  app.get('/api/users/:id', [UserController.getById]);

  // Update user by id
  app.put('/api/users/:id', [UserController.updateById]);

  // delete user by id    
  app.delete('/api/users/:id', [UserController.deleteById]);
}