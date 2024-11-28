const jwt = require("jsonwebtoken");
const userService = require('../services/userService');
const ENV_VARS = require('../config/envVars');

const protectRoute = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        // Check if the header starts with 'Bearer '
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token Format" });
        }


        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }


        const user = await userService.getUserById(decoded.id);

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