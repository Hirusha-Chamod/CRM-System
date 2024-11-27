const mysql = require('mysql2');
const ENV_VARS = require('./envVars');

const db = mysql.createConnection({
    host: ENV_VARS.DB_HOST,
    user: ENV_VARS.DB_USER,
    password: ENV_VARS.DB_PASSWORD,
    database: ENV_VARS.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

module.exports = db;