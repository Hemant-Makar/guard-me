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
                Utils.sendResponse(res, 404, null, 'User email not found');
            }
        });
};