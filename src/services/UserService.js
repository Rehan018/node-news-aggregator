const User = require("../models/User.js");
require('dotenv').config();
class UserService {
  static async creatUser(firstname,lastname,phoneno,email, password) {
    const newUser = new User({ firstname,lastname,phoneno,email,password });
    await newUser.save();
    return newUser;
  }
  static async getUserByEmail(email) {
    return User.findOne({ email });
  }
  static async updateUserPreferences(email, preferences) {
    return User.findOneAndUpdate({ email}, { preferences }, { new: true });
  }
}
module.exports = UserService;
