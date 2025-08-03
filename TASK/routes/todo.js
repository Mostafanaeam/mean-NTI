const express=require('express')
const router=express.Router()
const fs=require('fs')

const{gettodo,posttodo,gettodobyid,deletetodo}=require('../controller/todo')
router.get("/",gettodo );
  
router.post("/",posttodo );
  //Get By Id
  router.get('/:id',gettodobyid)
  //delete by id
  
  router.delete('/todo/:id',deletetodo)
  module.exports=router