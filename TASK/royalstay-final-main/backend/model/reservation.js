const mongoose = require("mongoose");
const validator = require("validator");

let reserveSchema = mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: Number, required: true },

  hotelName: { type: String, required: true, unique: true },
  roomType: { type: String, required: true },
  roomPrice: { type: Number, required: true },

  days: [{ type: Date }],
  total: { type: Number },
});

const reserveModel = mongoose.model("reservation", reserveSchema);
module.exports = reserveModel;