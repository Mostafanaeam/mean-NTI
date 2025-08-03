const express=require('express')
const route=express.Router()
const{getuser, createuser,login}=require('../controller/user')
route.get('/',getuser)
route.post('/',createuser)
route.post('/login',login)


module.exports=route
