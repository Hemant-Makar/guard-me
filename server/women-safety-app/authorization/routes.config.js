const AuthorizationController = require('./controllers/authorization.controller');
const VerifyUserMiddleware = require('./middlewares/verify.users.middleware');
exports.routesConfig = function (app) {

    // Login
    app.post('/login', [
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    // Logout
    app.get('/logout', [AuthorizationController.logout]);

    // app.post('/auth', [
    //     VerifyUserMiddleware.hasAuthValidFields,
    //     VerifyUserMiddleware.isPasswordAndUserMatch,
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
    app.post('/resetPassword', [AuthorizationController.resetPassword]);
};