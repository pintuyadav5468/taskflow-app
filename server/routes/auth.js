const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateToken, protect } = require("../middleware/auth");

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      const user = await User.create({
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({
          message: "Server error during registration",
          error: error.message,
        });
    }
  },
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Server error during login", error: error.message });
    }
  },
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;


