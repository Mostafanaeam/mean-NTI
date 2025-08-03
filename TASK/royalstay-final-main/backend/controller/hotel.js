const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const hotelModel = require("../model/hotel");

const getHotels = async (req, res) => {
  // let token = req.headers.authorization;
  const hotels = await hotelModel.find();
  try {
    res.json(hotels);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getHotelById = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await hotelModel.findOne({ _id: hotelId });
    res.json(hotel);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const createHotel = async (req, res) => {
  let newhotel = req.body;
  try {
    let savehotel = await hotelModel.create(newhotel);
    res.json({ message: "done new hotel", date: savehotel });
  } catch (err) {
    res.status(400).json(err);
  }
};

const loginHotel = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ maeesage: "you must enter email and password" });
  }

  const hotel = await hotelModel.findOne({ email: email });
  if (!hotel) {
    res.status(404).json({ meassage: "invalid email" });
  } else {
    try {
      const isvalid = await bcryptjs.compare(password, hotel.password);
      console.log("password match: " + isvalid);
      if (isvalid) {
        let token = jwt.sign(
          { id: hotel._id, email: hotel.email },
          process.env.SECRET
        );
        res.status(200).json({ message: "Successful login", token: token });
      } else {
        res.status(401).json({ message: "invalid password" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
};

const deleteHotel = async (req, res) => {
  // params is taken from link : http://localhost:4000/hotel/?id=675181c6dec21b197effd608
  const { hotelId } = req.params;
  try {
    await hotelModel.findOneAndDelete({ _id: hotelId });
    res.send("Hotel Deleted Successfully!!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateHotel = async (req, res) => {
  // params is taken from link : http://localhost:4000/hotel/?id=675181c6dec21b197effd608
  const hotelId = req.params;
  const update = req.body;
  try {
    await hotelModel.findByIdAndUpdate(hotelId, update, {
      new: true, // Return the room after it's updated
      runValidators: true, // Validate the data during the update  
    });
    res.send("Hotel Updated Successfully!!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  getHotels,
  createHotel,
  getHotelById,
  loginHotel,
  deleteHotel,
  updateHotel,
};
