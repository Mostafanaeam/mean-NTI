const mongoose = require("mongoose");
let userModel = require("../model/user");
let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken')
let getuser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
let postuser = async (req, res) => {
  try {
    let newuser = req.body;
    let saveuser = await userModel.create(newuser);
    res.json({ message: "success", data: saveuser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
let login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ maeesage: "you must enter email and password" });
  }
  let user = await userModel.findOne({ email: email });
  if (!user) {
    res.status(404).json({ meassage: "invalid email or password" });
  }
  let isvalid = await bcrypt.compare(password, user.password);
  if (!isvalid) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  let token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET)
  res.status(200).json({ token: token })
};
module.exports = { getuser, postuser, login };
