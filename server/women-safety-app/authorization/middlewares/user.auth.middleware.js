const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');
const Utils = require('../../utils/utils');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Missing email and password fields' });
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user) => {
            if (user) {
                let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body.user = user.toJSON();
                    return next();
                } else {
                    return Utils.sendResponse(res, 400, null, 'Invalid e-mail or password');
                }
            } else {
                return Utils.sendResponse(res, 404, null, 'User email not found');
            }
        });
};

// validate forgot password OTP
exports.hasValidOtp = async (req, res, next) => {
    try {
        const user = await UserModel.findByEmail(req.body.email);
        if (user.otp) {
            const otpExpirationTime = user.otp.expiredTime;
            const currentTime = Date.now();
            console.log('reset', user.otp, currentTime);
            const isExpiredOtp = currentTime >= otpExpirationTime;
            if (user.otp.otp === req.body.otp && !isExpiredOtp) {
                // Assign current user in req body
                req.body.user = user;
                return next();
            }
        }
        return Utils.sendResponse(res, 400, null, 'Invalid OTP, Please try again!');
    } catch (error) {
        return Utils.sendResponse(res, 404, null, 'User email not found');
    }
}