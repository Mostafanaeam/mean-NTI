const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
let userModel = require("../model/user");
let getuser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
let createuser = async(req,res)=>{
  let newuser = req.body;
  try{
    let saveuser = await userModel.create(newuser);
    res.json({message:"done new user",date:saveuser})
  }catch(err){
    res.status(400).json(err);
  }
}
let login = async (req,res)=>{
  let {email, password} = req.body;
  if (!email || !password) {
    return res
    .status(400).json({message: "you must enter email and password"})
  }
  const user = await userModel.findOne({email});
  if (!user) {
    return res.status(404).json({message: "invalid Email or Password"})
  }
  let isvalid = await bcrypt.compare(password, user.password)
  if (!isvalid) {
    return res.status(401).json({message: "invalid Email or Password"})
  }
  let token=jwt.sign({id:user._id,email:user.email},process.env.secret)
  res.status(200).json({token:token})
}
module.exports={getuser,createuser,login}