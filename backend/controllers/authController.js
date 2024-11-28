const authService = require('../services/authService');

const signup = async (req, res) => {
    console.log("Signup function called");
    console.log("Request Body:", req.body);

    const { email, password, name, profilePicture, role } = req.body;

    try {
        const result = await authService.registerUser({
            email,
            password,
            name,
            profilePicture,
            role,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    console.log("Login function called");

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const result = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

async function authCheck(req, res) {
    try {
        console.log("req.user:", req.user);
        res.status(200).json({ success: true, user: req.user, token: req.token });
    } catch (error) {
        console.error("Error in authCheck controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { signup, login, logout, authCheck };
