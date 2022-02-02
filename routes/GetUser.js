const express = require("express");
const router = express.Router();
const User = require("../models/User");

//get all users route
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
