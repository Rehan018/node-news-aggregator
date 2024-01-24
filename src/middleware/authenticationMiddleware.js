const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const JWT_SECRET='mysecretkey';
require('dotenv').config();
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }
  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
