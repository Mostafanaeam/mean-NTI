const express = require("express");
const router = express.Router();
const fs = require("fs");
const { auth } = require("../middleware/auth");
const {
  gettodo,
  posttodo,
  gettodobyid,
  deletetodo,
} = require("../controller/todo");
router.get("/", gettodo);

router.post("/", auth, posttodo);
//Get By Id
router.get("/:id", gettodobyid);
//delete by id

router.delete("/:id", deletetodo);
module.exports = router;
