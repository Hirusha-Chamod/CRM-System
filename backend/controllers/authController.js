const userService = require('../services/authService');

// Signup controller
const signup = async (req, res) => {
    console.log("Signup function called");
    console.log("Request Body:", req.body);

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

    try {
        const result = await userService.registerUser({
            email,
            password,
            name,
            profilePicture,
            role
        });

        // Send Success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error("Signup error:", error);

        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
            return res.status(409).json({ message: "This email is already registered" });
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Login controller
const login = async (req, res) => {
    console.log("Login function called");

    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const result = await userService.loginUser(email, password);

        res.status(200).json({
            success: true,
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(400).json({ message: error.message });
    }
};

// Logout controller
const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Auth check controller
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
