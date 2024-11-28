
const userService = require('../services/userService');

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const updatedUser = await userService.updateUser(userId, updatedData);
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    await userService.deleteUser(userId);
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
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers
};