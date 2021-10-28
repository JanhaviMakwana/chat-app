const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const appConfig = require("../config/config");

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      appConfig.appKey,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        user: { id: user._id.toString(), username: user.username },
        token: token
      });
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Wrong Password!" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      appConfig.appKey,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        user: { id: user._id.toString(), username: user.username },
        token: token
      });
  } catch (e) {
    res.status(500).json(e);
  }
};
