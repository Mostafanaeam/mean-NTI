const express=require('express')
const route=express.Router()

const{getuser,postuser,login}=require('../controller/user')
route.get('/',getuser)
route.post('/',postuser)
route.post('/login',login)
module.exports=route
