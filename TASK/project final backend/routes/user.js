const express = require('express');
const router = express.Router();
const{getAllUsers, register,login,deleteUser,updatepass}=require('../controller/user')
router.get('/',getAllUsers)
router.post('/register',register)
router.post('/login',login)
router.delete('/deletepass/:id',deleteUser)
router.put('/updatepass/:id',updatepass)


module.exports=router;
            