const AlarmsController = require('./controllers/alarms.controller');

exports.routesConfig = (app) => {
    // Raise alarm
    app.post('/alarms', [AlarmsController.createAlarm]);
    app.get('/alarms', [AlarmsController.findAllAlarms]);
    app.get('/alarms/:id', [AlarmsController.findAlarmById]);
    app.put('/alarms/:id', [AlarmsController.updateAlarm]);
}