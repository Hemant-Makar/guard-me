const UserController = require('../users/controllers/users.controller');

exports.routesConfig = (app) => {
  // Create user
  app.post('/users', [UserController.insert]);

  // Get all user list
  app.get('/users', [UserController.list]);

  // Get the user by id
  app.get('/users/:id', [UserController.getById]);

  // Update user by id
  app.put('/users/:id', [UserController.updateById]);

  // delete user by id    
  app.delete('/users/:id', [UserController.deleteById]);
}