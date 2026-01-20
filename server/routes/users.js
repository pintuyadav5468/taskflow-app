const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// All routes are protected
router.use(protect);

// @route   GET /api/users
// @desc    Get all users (for assignment purposes)
// @access  Private
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

module.exports = router;


