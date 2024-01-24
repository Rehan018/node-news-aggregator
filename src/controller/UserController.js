const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const UserService = require("../services/UserService.js");
require("dotenv").config();
const JWT_SECRET='mysecretkey';
class UserController {
  static async registerUser(req, res) {
    try {
      const { firstname, lastname, phoneno, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserService.creatUser(
        firstname,
        lastname,
        phoneno,
        email,
        hashedPassword
      );

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error during register" });
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      console.log(`Attempting login for email: ${email}`);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log("Login failed: Invalid email or password");
        return res.status(401).json({ message: "Invalid email or password" });
      }
      console.log("JWT_SECRET:", JWT_SECRET);
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successfull", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error during login" });
    }
  }
  static async updatePreference(req, res) {
    try {
      const { preferences } = req.body;
      const updatedUser = await UserService.updateUserPreferences(
        req.user.email,
        preferences
      );
      res.json({
        message: "Preferences updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error during updatePreference" });
    }
  }
}

module.exports = UserController;
