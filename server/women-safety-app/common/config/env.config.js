module.exports = {
    "port": 5001,
    "appEndPoint": "http://localhost:5001",
    "apiEndPoint": "http://localhost:5001",
    "serverIp": '0.0.0.0',
    "jwt_secret": "Wom@nS@fety@pplic@tion",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "databaseUrl": "mongodb://127.0.0.1:27017/guard-me",
    "emailConfig": {
        "user": "guardme20242@gmail.com",
        "password": "crii knrz wvgv tqen"
    },
    "permissionLevels": {
        "NORMAL_USER": 0,
        "RESPONDER_USER": 1,
        "ADMIN": 2
    },
    "victimStates": [
        0, // Flee => Safe
        1, // Fortify => Unsafe
        2, // Injured
    ]
}