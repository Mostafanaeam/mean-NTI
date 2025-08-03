const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT"],
  })
);
dotenv.config();
// .connect("mongodb+srv://Group1:Pass4Group1@cluster0.3u0tj.mongodb.net/hotelapp")
mongoose
  .connect("mongodb://localhost:27017/hotelapp")
  .then(() => {
    console.log("connected to db successefully");
  })
  .catch((err) => {
    console.log(err);
  });

const hotelRoutes = require("./routes/hotel");
app.use("/hotel", hotelRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const roomRoutes = require("./routes/room");
app.use("/hotel/room", roomRoutes);

const reservationRoutes = require("./routes/reservation");
app.use("/hotel/reserve", reservationRoutes);

app.listen(4000, () => console.log("connected to port 4000"));
