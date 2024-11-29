const jwt = require("jsonwebtoken");
const User = require('../models/user');
const ENV_VARS = require('../config/envVars');

const protectRoute = async (req, res, next) => {
    try {
       
        // Check if token is provided
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        // Check if token is valid
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token Format" });
        }

        // Verify token
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        
        const user = await User.getUserById(decoded.id); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

       
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);

       
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Unauthorized - Token Expired" });
        }

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { protectRoute };