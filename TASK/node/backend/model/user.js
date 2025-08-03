const mongoose = require("mongoose");
const bcryptjs=require('bcryptjs')
let userSchema=mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validator: function (email) {
      return /^[a-zA-Z]{15}[0-9]{0,5}(@)(gmail|outlook|org)(.com)/.test(email);
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
});
userSchema.pre('save',async function(next){

  var salt=await bcryptjs.genSalt(10)
  var hashpass=await bcryptjs.hash(this.password,salt)
  this.password=hashpass
  next()
})
const userModel=mongoose.model("User",userSchema)
module.exports=userModel