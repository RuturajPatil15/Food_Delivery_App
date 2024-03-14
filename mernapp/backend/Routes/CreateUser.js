const express = require("express");
const Router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//authToken me je secret key bheji ye user ko pata nahi chalti(ye veryfy signature secret key)
const jwtSecret = "IamRuturajPatilWebDeveloper"

Router.get("/", (req, res) => {
  res.send("Hello ruturaj");
});

//SignUp  Data
Router.post(
  "/createuser",
  [
    //validation
    body("email").isEmail(),
    // name must be at least 5 chars long
    body("name").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("password", "password at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //password secure kiya bcryptjs ka use karke(aise bohot algorithm hai iske)
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      const data = new User({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });

      // data.save(); ye aise direct kiya to yeaha hum jo data dalege oo data database me store hoga
      const userData = await data.save();
      req.body.name = userData.name;
      req.body.password = userData.password;
      req.body.email = userData.email;
      req.body.location = userData.location;

      console.log(data);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Login Data
Router.post(
  "/loginuser",
  [
    //validation
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "password at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if(!userData){
        return res.status(400).json({ errors: "Try logging with correct Email address" });
      }

      //bcrypt ka use karke password compare kiya 
      const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
      if(!passwordCompare){
        return res.status(400).json({ errors: "Try logging with correct Password" });
      }
    
      // if(req.body.password !== userData.password){
      //   return res.status(400).json({ errors: "Try logging with correct Password" });
      // }
       
      //userdata se id liya or oo user me save kiya(ye payload data)
      const data = {
       user:{
        id: userData.id
       }
      }

      //authtoken create kiya 
      const authToken = jwt.sign(data,jwtSecret); 
      return res.json({ success: true ,authToken: authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = Router;
