const AuthorizationController = require('./controllers/authorization.controller');
const UserAuthMiddleware = require('./middlewares/user.auth.middleware');
exports.routesConfig = function (app) {

    // Login
    app.post('/api/login', [
        UserAuthMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    // Logout
    app.get('/api/logout', [AuthorizationController.logout]);

    // app.post('/api/auth', [
    //     UserAuthMiddleware.hasAuthValidFields,
    //     UserAuthMiddleware.isPasswordAndUserMatch,
    //     AuthorizationController.login
    // ]);

    // app.post('/api/auth/refresh', [
    //     AuthValidationMiddleware.validJWTNeeded,
    //     AuthValidationMiddleware.verifyRefreshBodyField,
    //     AuthValidationMiddleware.validRefreshNeeded,
    //     AuthorizationController.login
    // ]);

    // Forgot password
    app.post('/api/forgotPassword', [AuthorizationController.forgotPassword]);
    // Reset password
    app.post('/api/resetPassword', [
        UserAuthMiddleware.hasValidOtp,
        AuthorizationController.resetPassword
    ]);
};