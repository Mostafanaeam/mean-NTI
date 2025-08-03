const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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
});

userSchema.pre("save",async function(next){
  var salt = await bcrypt.genSalt(10);
  var hashpass = await bcrypt.hash(this.password, salt);
  this.password = hashpass;
  next();
});

const userModel=mongoose.model("User",userSchema)
module.exports=userModel