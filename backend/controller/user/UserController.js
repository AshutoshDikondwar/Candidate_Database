const bcrypt = require('bcrypt')


const createUser = async (req, res) => {

    const { name, email, password, role } = req.body;
    const db = req.db


    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `Insert into users (name, email, password, role) values (?, ?, ?, ?)`
    const emailExists = await checkIfEmailExists(db, email);

    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists', success: false });
    }

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occured creating user', success: false })
        } else {

            res.status(201).json({ message: 'user created successfully', success: true })
        }
    })


}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const db = req.db

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error occured login user', success: false })
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found', success: false });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.status(200).json({ message: 'Login successfully', success: true, user: results[0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials', success: false });
        }
    })
}


const checkIfEmailExists = async (db, email) => {
    return new Promise((resolve, reject) => {
        const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
        db.query(checkEmailSql, [email], (err, results) => {
            if (err) {
                return reject('Error checking user email');
            }
            resolve(results.length > 0);
        })
    })
}

module.exports = {
    createUser,
    loginUser
};