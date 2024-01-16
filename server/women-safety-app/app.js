const config = require('./common/config/env.config');

// User Module
const UserRouters = require('./users/routes.config');
// Auth Module
const AuthRouters = require('./authorization/routes.config');

// Alarm Module
const AlarmRouters = require('./alarms/routes.config')

const express = require('express');
const envConfig = require('./common/config/env.config');
const app = express();

app.use(express.json());

// Configure users middleware
UserRouters.routesConfig(app);
AuthRouters.routesConfig(app);
AlarmRouters.routesConfig(app);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        // Pass request to subscribed middlewares
        return next();
    }
});

// Listen the API request on configured port number
app.listen(config.port, envConfig.serverIp, () => {
    console.log(`app listening at port ${config.port}`);
});