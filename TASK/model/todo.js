const mongoose = require("mongoose");
const schemaTodo = mongoose.Schema({
  title: {
    type:String,
    required: [true, " must be entered"],
    unique: [true, "title must be unique"],
  },
  satues: {String,
    enum:["in progress","doing","todo"]
  },
  date: Date,
  id:{
    type:mongoose.Schema.ObjectId,ref:"User",required:"true"
  }
});


const todoModel=mongoose.model("Todo",schemaTodo)
module.exports=todoModel