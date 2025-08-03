var express = require("express");
const app = express();
const userRoutes=require('./routes/user')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/userDB').then(()=>{
  console.log("contectted to db successefully")

}).catch((err)=>{
console.log(err)
});


app.use('/user',userRoutes)

app.use('*',(req,res)=>{
  res.status(404).json({"message":"sorry Url Not  Found"})
})
app.listen(3000, () => {
  console.log("hello from port 3000");
});


