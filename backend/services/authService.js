const bcrypt = require('bcrypt');
const db = require('../config/db');
const generateToken = require('../utils/generateToken');
const userModel = require('../models/user');

const registerUser = async (userData) => {
    const validationErrors = userModel.validate(userData);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
    }

    return new Promise((resolve, reject) => {
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';

        db.query(checkUserQuery, [userData.email], async (checkErr, existingUsers) => {
            if (checkErr) {
                return reject(checkErr);
            }

            if (existingUsers.length > 0) {
                return reject(new Error('User with this email already exists'));
            }

            try {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                const { name, email, profile_picture, role } = userData;

                const insertQuery = `
                    INSERT INTO users (name, email, password, profile_picture, role, created_at) 
                    VALUES (?, ?, ?, ?, ?, NOW())
                `;

                db.query(
                    insertQuery,
                    [name, email, hashedPassword, profile_picture || null, role || 'user'],
                    (insertErr, result) => {
                        if (insertErr) {
                            return reject(insertErr);
                        }

                        const getUserQuery = 'SELECT * FROM users WHERE id = ?';
                        db.query(getUserQuery, [result.insertId], (getUserErr, users) => {
                            if (getUserErr) {
                                return reject(getUserErr);
                            }

                            const sanitizedUser = userModel.sanitize(users[0]);
                            const token = generateToken(sanitizedUser.id);
                            resolve({ 
                                user: sanitizedUser, 
                                token 
                            });
                        });
                    }
                );
            } catch (hashError) {
                reject(hashError);
            }
        });
    });
};

const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';

        db.query(query, [email], async (err, users) => {
            if (err) {
                return reject(err);
            }

            if (users.length === 0) {
                return reject(new Error('User not found'));
            }

            const user = users[0];

            try {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return reject(new Error('Invalid credentials'));
                }

                const token = generateToken(user.id);
                const sanitizedUser = userModel.sanitize(user);

                resolve({ 
                    token, 
                    user: sanitizedUser 
                });
            } catch (compareError) {
                reject(compareError);
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
};
