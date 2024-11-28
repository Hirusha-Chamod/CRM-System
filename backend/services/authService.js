const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');  // Import the token generation utility
const userModel = require('../models/user');

const registerUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUserData = {
            ...userData,
            password: hashedPassword
        };

        const user = await userModel.createUser(newUserData);
        
        const token = generateToken(user.id);

       
        return { user, token };
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await userModel.getUserByEmail(email);
        
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user.id);

        return { token, user };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser
};
