const mysql = require('mysql2')

const connectDB = (host, user, password, database) => {
    const db = mysql.createConnection({
        host,
        user,
        password,
        database
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
