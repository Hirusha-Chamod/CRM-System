
const validate = (userData) => {
    const errors = [];

    if (!userData.email || !userData.email.includes('@')) {
        errors.push('Invalid email format');
    }

    if (!userData.password || userData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!userData.name || userData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    return errors;
};

const sanitize = (user) => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};

module.exports = {
    validate,
    sanitize
};