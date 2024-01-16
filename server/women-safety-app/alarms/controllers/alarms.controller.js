const AlarmModel = require('../models/alarms.model');
const Utils = require('../../utils/utils');
// Create Alarm
exports.createAlarm = async (req, res) => {
    try {
        const alarmData = req.body;
        alarmData.createdBy = req.query.userId;
        alarmData.participants = [{ user: req.query.userId, location: alarmData.location }];
        const result = await AlarmModel.createAlarm(alarmData);
        Utils.sendResponse(res, 201, result);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
};

// Find All alarms
exports.findAllAlarms = async (req, res) => {
    try {
        const alarms = await AlarmModel.findAllAlarms();
        Utils.sendResponse(res, 200, alarms);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
};

// Find by alarm by id
exports.findAlarmById = async (req, res) => {
    try {
        const alarm = await AlarmModel.findAlarmById(req.params.id);
        Utils.sendResponse(res, 200, alarm);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
}

// Update alarm by id
exports.updateAlarm = async (req, res) => {
    try {
        const alarm = await AlarmModel.updateAlarm(req.params.id, req.query.userId, req.body);
        Utils.sendResponse(res, 200, alarm);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};

// Update alarm by id
exports.deleteAlarm = async (req, res) => {
    try {
        const alarm = await AlarmModel.deleteAlarm(req.params.id);
        Utils.sendResponse(res, 200, alarm);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};

// Update user state by id
exports.updateUserState = async (req, res) => {
    try {
        const alarm = await AlarmModel.updateUserState(req.params.id, req.query.userId, req.body);
        Utils.sendResponse(res, 200, alarm);
    } catch (error) {
        Utils.sendResponse(res, 404, null, error);
    }
};

// Allow User to join existing alarm
exports.joinAlarm = async (req, res) => {
    try {
        const result = await AlarmModel.joinAlarm(req.params.id, req.query.userId, req.body);
        Utils.sendResponse(res, 200, result);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
};

// Allow leaving the user from current Alarm
exports.leaveAlarm = async (req, res) => {
    try {
        const result = await AlarmModel.leaveAlarm(req.params.id, req.query.userId);
        Utils.sendResponse(res, 200, result);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
}