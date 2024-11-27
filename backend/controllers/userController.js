const userService = require('../services/userService');

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    // Basic validation
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const result = await userService.updateUser(userId, updatedData);
        res.status(200).json({
            message: "User updated successfully",
            user: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating user",
            error: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    // Basic validation
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        await userService.deleteUser(userId);  // Assuming deleteUser does not return anything
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting user",
            error: err.message
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            message: "Users retrieved successfully",
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getAllUsers
};