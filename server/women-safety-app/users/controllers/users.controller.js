const UserModel = require('../models/users.model');
const crypto = require('crypto');
const Utils = require('../../utils/utils');
// Create user
exports.insert = async (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    try {
        const result = await UserModel.createUser(req.body);
        Utils.sendResponse(res, 201, result);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error.message || error.errors.message);
    }
};

// Get all users
exports.list = async (req, res) => {
    try {
        const users = await UserModel.findAllUser();
        Utils.sendResponse(res, 200, users);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
};

// Get user by id
exports.getById = async (req, res) => {
    try {
        const record = await UserModel.findById(req.params.id);
        Utils.sendResponse(res, 200, record);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};
// update user by id
exports.updateById = async (req, res) => {
    try {
        const result = await UserModel.updateUser(req.params.id, req.body);
        Utils.sendResponse(res, 200, result);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
}

// delete user by id
exports.deleteById = async (req, res) => {
    try {
        const result = await UserModel.deleteUser(req.params.id);
        console.log(result);
        Utils.sendResponse(res, 200, result);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const record = await UserModel.findByEmail(req.body.email);
        Utils.sendResponse(res, 200, record);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};