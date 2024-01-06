module.exports = {
    "port": 5001,
    "appEndPoint": "http://localhost:5001",
    "apiEndPoint": "http://localhost:5001",
    "jwt_secret": "Wom@nS@fety@pplic@tion",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "databaseUrl":"mongodb://127.0.0.1:27017/guard-me",
    "permissionLevels": {
        "NORMAL_USER": 0,
        "RESPONDER_USER": 1,
        "ADMIN": 2
    }
}