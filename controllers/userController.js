const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // The token will be valid for 30 days.
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // 2. Basic Validation: Check if all required fields were provided.
    if (!name || !email || !password) {
      res.status(400); // BAD request
      throw new Error("Please provide all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Generate a token for the new user
      });
    } else {
      res.status(400); // 400 bad request
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
};
