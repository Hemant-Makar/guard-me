const jwtSecret = require('../../common/config/env.config.js').jwt_secret;
const UserModel = require('../../users/models/users.model.js')
const config = require('../../common/config/env.config.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Utils = require('../../utils/utils.js');

// Login
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
// Logout the user
exports.logout = (req, res) => {
    Utils.sendResponse(res, 200, 'User logout successfully');
};
// Forgot password. Send OPT to registed email address
exports.forgotPassword = async (req, res) => {
    try {
        const user = await UserModel.findByEmail(req.body.email);
        user.otp = generateOtp();
        await user.save();
        await sendEmailWithOtp(user.otp, user.email)
        Utils.sendResponse(res, 200, 'OTP is sent to your register email address');
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};
// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const user = await UserModel.findByEmail(req.body.email);
        if (user.otp === req.body.otp) {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            user.password = salt + '$' + hash;
            user.otp = null;
            await user.save();
            Utils.sendResponse(res, 200, 'Password resetted successfully', null);
        } else {
            Utils.sendResponse(res, 400, null, 'Invalid OTP');
        }
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};
/// Refresh Access Token
exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};
/**
 * Generate 4 digit opt for forgot password
 */
function generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}
/**
 * Send forgot password OPT to user register email address
 * @param {*} otp The current OTP for reset password
 * @param {*} userEmail The registered user email address
 */
async function sendEmailWithOtp(otp, userEmail) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.emailConfig.user,
            pass: config.emailConfig.password
        }
    });
    const emailOptions = {
        from: config.emailConfig.user,
        to: userEmail,
        subject: 'Women Safety password reset OTP',
        text: `Your OTP is : ${otp}`,
    };
    return transporter.sendMail(emailOptions);
}