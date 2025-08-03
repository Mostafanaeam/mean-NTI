const { validationResult } = require("express-validator");
const Room = require("../model/room");
const textstatus = require("../utils/statustext");
const appError = require("../utils/error");
const asyncWrapper = require("../middleware/asyncwrapper");

// Function to check if a room exists in the database
const ensureRoomExists = async (roomId) => {
  const room = await Room.findById(roomId);
  // If the room is not found, throw a 404 error
  if (!room) {
    const error = appError.create("Room not found", 404, textstatus.FAIL);
    throw error;
  }
  return room; // Return the room if it exists
};

// Function to get all rooms from the database
let getAllRooms = asyncWrapper(async (req, res) => {
  const query = req.query; // Get query parameters
  const limit = parseInt(query.limit) || 6; // Set the limit (default: 6)
  const page = parseInt(query.page) || 1; // Set the page number (default: 1)
  const skip = (page - 1) * limit; // Calculate the number of items to skip

  // Fetch rooms from the database, excluding the `__v` field
  const rooms = await Room.find({}, { __v: false })
    .limit(limit) // Set the limit for the results
    .skip(skip); // Skip a specified number of results

  // Send the rooms as a JSON response
  res.json({ status: textstatus.SUCCESS, data: { rooms } });
});

// Function to get a single room by its ID
let getRoomById = asyncWrapper(async (req, res, next) => {
  // Check if the room exists using the ensureRoomExists function
  const room = await ensureRoomExists(req.params.roomId);

  // Return the room as a response
  return res.json({ status: textstatus.SUCCESS, data: { room } });
});

// Function to add a new room to the database
let addRoom = asyncWrapper(async (req, res, next) => {
  // Validate the incoming request using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, create an error and pass it to the middleware
    const error = appError.create(errors.array(), 400, textstatus.FAIL);
    return next(error);
  }

  // Create a new room using the data from the request
  const newRoom = new Room(req.body);
  await newRoom.save(); // Save the room to the database

  // Send a response containing the newly created room
  res.status(201).json({ status: textstatus.SUCCESS, data: { room: newRoom } });
});

// Function to update an existing room
let updateRoom = asyncWrapper(async (req, res, next) => {
  const roomId = req.params.roomId;

  // Check if the room exists using the ensureRoomExists function
  await ensureRoomExists(roomId);

  // Update the room and return the updated data
  const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, {
    new: true, // Return the room after it's updated
    runValidators: true, // Validate the data during the update
  });

  // Send a response containing the updated room
  res
    .status(200)
    .json({ status: textstatus.SUCCESS, data: { room: updatedRoom } });
});

// Function to delete a room by its ID
let deleteRoom = asyncWrapper(async (req, res) => {
  const roomId = req.params.roomId;

  // Check if the room exists using the ensureRoomExists function
  await ensureRoomExists(roomId);

  // Delete the room from the database
  const result = await Room.deleteOne({ _id: roomId });

  // Send a response indicating success and the number of deleted items
  res.status(200).json({
    status: textstatus.SUCCESS,
    message: "Room deleted successfully",
    data: { deletedCount: result.deletedCount }, // Number of deleted items
  });
});

// Export all functions to be used in the routes
module.exports = { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom };
