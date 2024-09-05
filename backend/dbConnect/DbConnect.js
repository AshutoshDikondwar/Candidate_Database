const mysql = require('mysql2')

const connectDB = (host, user, password, database, port) => {
    const db = mysql.createConnection({
        host,
        user,
        password,
        database,
        port,
        connectTimeout:10000
    })
    db.connect((err) => {
        if (err) {
            console.log(`Error connecting to MySQL`, err);
            return;
        } else {
            console.log('database connected successfully');
        }
    })
    return db;

}

module.exports = connectDB;
