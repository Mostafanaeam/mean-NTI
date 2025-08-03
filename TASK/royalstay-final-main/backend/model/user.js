const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "failed must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  var hashpass = await bcrypt.hash(this.password, salt);
  this.password = hashpass;
  next();
});

module.exports = mongoose.model("user", userSchema);
