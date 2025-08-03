const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// - Requiring the model
const reserveModel = require("../model/reservation");

// get all reservations
const getReservations = async (req, res) => {
  const reservations = await reserveModel.find();
  try {
    res.json(reservations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get reservation by Id
const getReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await reserveModel.findOne({ _id: id });
    res.json(reservation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// make reservation
const reserve = async (req, res) => {
  let reservation = req.body;
  await reserveModel.create(reservation);
  try {
    res.json({ message: "Done reservation!!", data: reservation });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// change reservation
const change = async (req, res) => {
  const reserveId = req.params;
  const update = req.body;
  try {
    await reserveModel.findByIdAndUpdate(reserveId, update, {
      new: true, // Return the room after it's updated
      runValidators: true, // Validate the data during the update
    });
    res.send("reservation Updated Successfully!!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// cancel reservation
const cancel = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  getReservations,
  getReservation,
  reserve,
  change,
  cancel,
};
