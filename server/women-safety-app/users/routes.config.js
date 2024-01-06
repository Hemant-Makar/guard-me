const UserController = require("../users/controllers/users.controller");

exports.routesConfig = (app) => {
  // Add/Register user
  app.post('/users', [UserController.insert]);

  // Get all user list
  app.get('/users', [UserController.list]);

  // Get the user by userId
  app.get('/users/:id', [UserController.getById]);

  // Update user by userId
  app.put('/users/:id', [UserController.updateById]);

  // delete user by userId    
  app.delete('/users/:id', [UserController.deleteById]);
}