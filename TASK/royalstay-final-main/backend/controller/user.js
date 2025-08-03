const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let userModel = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const register = async (req, res) => {
  let newuser = req.body;
  try {
    let saveuser = await userModel.create(newuser);
    res.json({ message: "done new user", date: saveuser });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "you must enter email and password" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "invalid Email or Password" });
  }

  let isvalid = await bcrypt.compare(password, user.password);
  if (isvalid) {
    let token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.secret
    );
    res.status(200).json({ message: "successful login", token: token });
  } else {
    res.status(401).json({ message: "invalid Email or Password" });
  }
};

module.exports = { getAllUsers, register, login };
