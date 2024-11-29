
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

// Update a user
const updateUser = async (userId, updatedData) => {
    try {
        if (updatedData.password) {
            const hashedPassword = await bcrypt.hash(updatedData.password, 10);
            updatedData.password = hashedPassword;
        }

        const results = await userModel.updateUser(userId, updatedData);
        return results;
    } catch (err) {
        throw err;
    }
};

// Delete a user
const deleteUser = async (userId) => {
    try {
        const results = await userModel.deleteUser(userId);
        return results;
    } catch (err) {
        throw err;
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const users = await userModel.getAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
};

// Get a user by id
const getUserById = async (id) => {
    try {
        const user = await userModel.getUserById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};
