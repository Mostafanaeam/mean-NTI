const express = require("express");
const { body, validationResult } = require("express-validator");

const route = express.Router();
const {
  getAllRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
} = require("../controller/room");

route.get("/", getAllRooms);
route.get("/:id", getRoomById);
route.post("/", addRoom);
route.put("/:id", updateRoom);
route.delete("/:id", deleteRoom);

module.exports = route;
