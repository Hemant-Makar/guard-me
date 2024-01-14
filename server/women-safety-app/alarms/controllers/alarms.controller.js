const AlarmModel = require('../models/alarms.model');
const Utils = require('../../utils/utils');
// Create Alarm
exports.createAlarm = async (req, res) => {
    try {
        const alarmData = req.body;
        alarmData.createdBy = req.query.userId;
        alarmData.participants = [req.query.userId]
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
        Utils.sendResponse(res, 400, null, error);
    }
}

// Update alarm by id
exports.updateAlarm = async (req, res) => {
    try {
        const alarm = await AlarmModel.updateAlarm(req.params.id, req.query.userId, req.body);
        Utils.sendResponse(res, 200, alarm);
    } catch (error) {
        Utils.sendResponse(res, 400, null, error);
    }
};