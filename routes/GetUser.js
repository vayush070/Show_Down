const express = require("express");
const router = express.Router();
const User = require("../models/User");

//get all users route
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
