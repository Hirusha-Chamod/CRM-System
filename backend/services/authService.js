const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const userModel = require('../models/user');

// Service function to register a user
const registerUser = async (userData) => {
    try {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Prepare user data with hashed password
        const newUserData = {
            ...userData,
            password: hashedPassword
        };

        // Call the model's createUser function to save user in database
        return await userModel.createUser(newUserData);
    } catch (error) {
        throw error;
    }
};

// Service function to login a user
const loginUser = async (email, password) => {
    try {
        // Get user by email
        const user = await userModel.getUserByEmail(email);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Compare provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create JWT token if credentials are correct
        const token = generateToken(user.id); // Note: changed from _id to id
        
        return { token, user };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser
};