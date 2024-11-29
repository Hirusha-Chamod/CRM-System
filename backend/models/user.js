const db = require('../config/db');

const createUser = (userData) => {
    const { email, password, name, profile_picture, role } = userData;
    const query = 'INSERT INTO users (email, password, name, profile_picture, role) VALUES (?,?,?,?,?)';

    return new Promise((resolve, reject) => {
        db.query(query, [email, password, name, profile_picture, role], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve({ id: result.insertId, email, name, profile_picture, role });
            }
        });
    });
};

const getUserByEmail = (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};

const getUserById = (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    delete results[0].password;
                }
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};

const getAllUsers = () => {
    const query = 'SELECT * FROM users';

    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const deleteUser = (userId) => {
    const query = 'DELETE FROM users WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const updateUser = (id, updatedData) => {
    const { email, password, name, profile_picture, role } = updatedData;
    const query = `
        UPDATE users 
        SET email = ?, password = ?, name = ?, profile_picture = ?, role = ? 
        WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [email, password, name, profile_picture, role, id], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.affectedRows === 0) {
                reject(new Error('User not found'));
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById
};