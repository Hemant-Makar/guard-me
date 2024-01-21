const jwtSecret = require('../../common/config/env.config.js').jwt_secret;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Utils = require('../../utils/utils.js');

exports.login = async (req, res) => {
    try {
        let refreshId = req.body.email + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let accessToken = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refreshToken = b.toString('base64');
        const user = req.body.user;
        Utils.sendResponse(res, 200, { accessToken, refreshToken, user });
    } catch (err) {
        // res.status(500).send({ errors: err });
        Utils.sendResponse(res, 400, null, err);
    }
};

exports.logout = (req, res) => {
    Utils.sendResponse(res, 200, 'User logout successfully');
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};