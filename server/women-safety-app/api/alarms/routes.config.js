const AlarmsController = require('./controllers/alarms.controller');

exports.routesConfig = (app) => {
    // Raise alarm
    app.post('/api/alarms', [AlarmsController.createAlarm]);
    app.get('/api/alarms', [AlarmsController.findAllAlarms]);
    app.get('/api/alarms/:id', [AlarmsController.findAlarmById]);
    app.put('/api/alarms/:id', [AlarmsController.updateAlarm]);
    app.delete('/api/alarms/:id', [AlarmsController.deleteAlarm]);

    // User operations on alarms
    app.post('/api/alarms/join/:id', [AlarmsController.joinAlarm]);
    app.get('/api/alarms/leave/:id', [AlarmsController.leaveAlarm]);
    app.put('/api/alarms/userstate/:id', [AlarmsController.updateUserState]);
}