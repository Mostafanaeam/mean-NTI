const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
let userModel = require("../model/user");

const getAllUsers = async (req, res) => {
    try {
    const user = await userModel.find();
    res.json(user);
    } catch (err) {
    res.status(404).json({ message: err.message });
    }
};
const register = async(req,res)=>{
    let newuser = req.body;
    try{
    let saveuser = await userModel.create(newuser);
    res.json({message:"done new user",date:saveuser})
    }catch(err){
    res.status(400).json(err);
    }
};
const login = async (req,res)=>{
    let {email, password} = req.body;
    if (!email || !password) {
    return res.status(400).json({message: "you must enter email and password"})
    }
    const user = await userModel.findOne({email});
    if (!user) {
    return res.status(404).json({message: "invalid Email or Password"})
    }
    let isvalid = await bcrypt.compare(password, user.password)
    if (!isvalid) {
    return res.status(401).json({message: "invalid Email or Password"})
    }
    if(isvalid){
        let token=jwt.sign({id:user._id,email:user.email},process.env.secret)
        res.status(200).json({token:token})
        res.json({message: "successful login , here your token:-" ,token})
    }
    
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // حذف المستخدم من قاعدة البيانات
        const result = await User.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
const updatepass =  async (req, res) => {
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;
        // التحقق من إدخال كلمة مرور جديدة
        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }
        // تشفير كلمة المرور الجديدة
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // تحديث كلمة المرور في قاعدة البيانات
        const result = await User.updateOne(
            { _id: userId },
            { password: hashedPassword }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update password' });
    }
};



module.exports = {getAllUsers,register,login,deleteUser,updatepass}