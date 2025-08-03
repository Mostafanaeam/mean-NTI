const route = require("express").Router();
// const auth = require("../middleware/auth");
const {
  getReservations,
  getReservation,
  reserve,
  change,
  cancel,
} = require("../controller/reservation");

route.get("/", getReservations);
route.post("/:id", getReservation);
route.post("/reserve", reserve);
route.put("/change/:id", change);
route.delete("/:id", cancel);

module.exports = route;
