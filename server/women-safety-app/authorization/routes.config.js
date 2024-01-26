const AuthorizationController = require('./controllers/authorization.controller');
const UserAuthMiddleware = require('./middlewares/user.auth.middleware');
exports.routesConfig = function (app) {

    // Login
    app.post('/login', [
        UserAuthMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    // Logout
    app.get('/logout', [AuthorizationController.logout]);

    // app.post('/auth', [
    //     UserAuthMiddleware.hasAuthValidFields,
    //     UserAuthMiddleware.isPasswordAndUserMatch,
    //     AuthorizationController.login
    // ]);

    // app.post('/auth/refresh', [
    //     AuthValidationMiddleware.validJWTNeeded,
    //     AuthValidationMiddleware.verifyRefreshBodyField,
    //     AuthValidationMiddleware.validRefreshNeeded,
    //     AuthorizationController.login
    // ]);

    // Forgot password
    app.post('/forgotPassword', [AuthorizationController.forgotPassword]);
    // Reset password
    app.post('/resetPassword', [
        UserAuthMiddleware.hasValidOtp,
        AuthorizationController.resetPassword
    ]);
};