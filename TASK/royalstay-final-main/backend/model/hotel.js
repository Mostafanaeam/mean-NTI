const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("validator");

let hotelSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "failed must be a valid email address"],
  },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  rooms: [
    {
      roomType: {
        type: String,
        enum: ["Single", "Double", "Suite"], // Allowed room types
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0, // Price should not be negative
      },
      count: {
        type: Number,
        default: 0,
      },
      class: {
        type: String,
        enum: ["Economy", "Standard", "Luxury", "Premium"], // Allowed room classes
        required: true,
        default: "Standard", // Default to 'Standard'
      },
      description: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      imagesurl: [],
    },
  ],
});

hotelSchema.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  var hashpass = await bcrypt.hash(this.password, salt);
  this.password = hashpass;
  next();
});

hotelModel = mongoose.model("hotel", hotelSchema);
module.exports = hotelModel;
