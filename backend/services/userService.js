
const db = require('../config/db');
const {validate,sanitize} = require('../models/user');

const updateUser = async (userId, updatedData) => {
    
    const validationErrors = validate(updatedData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }
  
    
    return new Promise((resolve, reject) => {
      const { email, password, name, profile_picture, role } = updatedData;
      const query = `
        UPDATE users 
        SET email = ?, password = ?, name = ?, profile_picture = ?, role = ? 
        WHERE id = ?
      `;
  
      db.query(query, [email, password, name, profile_picture, role, userId], (err, result) => {
        if (err) {
          return reject(err);
        }
  
        if (result.affectedRows === 0) {
          return reject(new Error('User not found'));
        }
  
        // Fetch updated user
        getUserById(userId)
          .then(user => resolve(sanitize(user)))
          .catch(reject);
      });
    });
  };
  
  const deleteUser = async (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
  
      db.query(query, [userId], (err, result) => {
        if (err) {
          return reject(err);
        }
  
        if (result.affectedRows === 0) {
          return reject(new Error('User not found'));
        }
  
        resolve();
      });
    });
  };
  
  const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
  
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
  
        resolve(results.map(User.sanitize));
      });
    });
  };
  
  const getUserById = async (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
  
      db.query(query, [userId], (err, results) => {
        if (err) {
          return reject(err);
        }
  
        if (results.length === 0) {
          return reject(new Error('User not found'));
        }
  
        resolve(results[0]);
      });
    });
  };
  
  module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
  };