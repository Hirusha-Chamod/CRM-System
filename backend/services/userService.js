
const userModel = require('../models/user');

const updateUser = async (userId, updatedData) => {
    try {
        const results = await userModel.updateUser(userId, updatedData);
        return results; 
    } catch (err) {
        throw err; 
    }
};

const deleteUser = async (userId) => {
    try {
        const results = await userModel.deleteUser(userId);
        return results; 
    } catch (err) {
        throw err; 
    }
};

const getAllUsers = async () => {
    try {
        const users = await userModel.getAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers
};
