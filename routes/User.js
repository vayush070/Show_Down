const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");

//add users route
router.post("/", async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  data.map(async (body, i) => {
    const { email, fullname, username } = body;

    //email validation here :)
    const validateEmail = (emailcheck) => {
      return String(emailcheck)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (!validateEmail(email)) {
      // console.log("h1");
      return res.status(400).send({ error: "not a valid email" });
    }
    //

    //username length checking here :)
    if (username.length < 4) {
      // console.log("h2");
      return res
        .status(400)
        .json({ error: "username required with minimum 4 alphabets" });
    }
    //

    try {
      let user = await User.findOne({ email });
      if (user) {
        // console.log("h3");
        return res
          .status(400)
          .send({ error: ` User ${i + 1} Already exists ` });
      }
      user = new User({
        email,
        fullname,
        username,
      });

      await user.save();
      res.status(200).send({ msg: `User ${i + 1} Added` });
    } catch (error) {
      // console.log("here");
      // console.error({ error: error });
      res.status(500).send({ error: error.message });
    }
  });
});

module.exports = router;
