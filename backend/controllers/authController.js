const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const signup = async (req, res) => {
    console.log("Signup function called");
    console.log("Request Body:", req.body); // Log the request body
    try {
        const { email, password, name, profilePicture, role } = req.body;

        // Validate required fields
        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters" });
        }

        // Check for existing user by email
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            profilePicture,
            role
        });

        await newUser.save();

        // Generate token and set in response
        generateToken(newUser._id, res);
        res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const login = async (req, res) => {
    console.log("Login function called");

    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if user exists by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }

        // Compare provided password with hashed password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token and set in response
        const token = generateToken(user._id, res);
        const { password: _, ...userData } = user.toObject();

        // Include user data and token in the response
        res.status(200).json({ success: true, user: userData, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



const logout = async (req, res) => {
    try {
        res.clearCookie("jwt-edu");
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
    }
}

async function authCheck(req, res) {
    try {
        console.log("req.user:", req.user);
        res.status(200).json({ success: true, user: req.user, token: req.token });
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { signup, login, logout, authCheck };
