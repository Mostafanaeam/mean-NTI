// var valid=require('validator')
// let email="heba@test.com"
// console.log(valid.isEmail(email))
var express = require("express");
//var cros = require("cros");
var cros=require('cors')
var fs = require("fs");
const app = express();
const dotenv=require('dotenv')
const mongoose = require("mongoose");

//built in middelware بوابه م بين req,res  بحيث تحول اي حاجه بوست لانها راجعه json
app.use(express.json());

app.use(express.static("./static"));
 app.use(cros({
  origin:"*","methods":["POST","GET","PUT"]
 }))
 dotenv.config()
//end POint routes

const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const todoModel = require("./model/todo");
mongoose
  .connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => {
    console.log("contectted to db successefully");
  })
  .catch((err) => {
    console.log(err);
  });
// ! view
app.set('view engine' ,'pug')
app.set('views','./views')
app.get('/views',async(req,res)=>{
  let todos =await todoModel.find()
  res.render('todo', {todos})
})
//to create collection 1-sechema model
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
// console.log("hello")
app.use("*", (req, res) => {
  res.status(404).json({ message: `${req.baseUrl}sory Not Url Found` });
});
app.listen(3000, () => {
  console.log("hello from port 3000");
});

// ODM object document modeling

// mongoose
