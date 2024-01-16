const AlarmsController = require('./controllers/alarms.controller');

exports.routesConfig = (app) => {
    // Raise alarm
    app.post('/alarms', [AlarmsController.createAlarm]);
    app.get('/alarms', [AlarmsController.findAllAlarms]);
    app.get('/alarms/:id', [AlarmsController.findAlarmById]);
    app.put('/alarms/:id', [AlarmsController.updateAlarm]);
    app.delete('/alarms/:id', [AlarmsController.deleteAlarm]);

    // User operations on alarms
    app.post('/alarms/join/:id', [AlarmsController.joinAlarm]);
    app.get('/alarms/leave/:id', [AlarmsController.leaveAlarm]);
    app.put('/alarms/userstate/:id', [AlarmsController.updateUserState]);
}