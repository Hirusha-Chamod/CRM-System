const jwt = require('jsonwebtoken');
const ENV_VARS = require('../config/envVars');

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
    return token;
};
module.exports = generateToken;
