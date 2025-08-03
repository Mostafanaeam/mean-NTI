const express = require('express');
const router = express.Router();
const{getAllUsers, register,login}=require('../controller/user')
router.get('/',getAllUsers)
router.post('/register',register)
router.post('/login',login)


module.exports=router;
            