const route = require("express").Router();
// const auth = require("../middleware/auth");
const {
  getHotels,
  createHotel,
  getHotelById,
  loginHotel,
  deleteHotel,
  updateHotel,
} = require("../controller/hotel");

route.get("/", getHotels);
route.post("/:hotelId", getHotelById);
route.post("/register", createHotel);
route.post("/login", loginHotel);
route.put("/update/:hotelId", updateHotel);
route.delete("/:hotelId", deleteHotel);

module.exports = route;
