const config = require('./common/config/env.config');

const express = require('express');
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        // Pass request to subscribe middleware
        return res.send('<div>Welcome to Guard Me Application</div>');
    }
});

// Listen the API request on configured port number
app.listen(config.port, ()=> {
    console.log(`app listening at port ${config.port}`);
});