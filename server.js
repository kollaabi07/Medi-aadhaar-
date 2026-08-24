const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mama_health_care")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });


// Home API
app.get("/", (req, res) => {
  res.json({
    message: "MAMA Health Care Backend is running",
    status: "success"
  });
});


// Test API
app.get("/api/test", (req, res) => {
  res.json({
    message: "MAMA Health Care API is working",
    status: "success"
  });
});


// Register API
app.post("/api/register", async (req, res) => {

  try {

    console.log("Register request received");
    console.log(req.body);

    const {
      name,
      email,
      mobile,
      password
    } = req.body;


    if (!name || !email || !mobile || !password) {

      return res.status(400).json({
        message: "Please fill all fields",
        status: "error"
      });

    }


    const existingUser = await User.findOne({
      email: email
    });


    if (existingUser) {

      return res.status(409).json({
        message: "Email already registered",
        status: "error"
      });

    }


    const newUser = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: password
    });


    console.log("Saving user to MongoDB...");


    await newUser.save();


    console.log("User saved successfully");


    res.status(201).json({
      message: "Registration successful",
      status: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile
      }
    });


  } catch (error) {

    console.log("Registration error");
    console.log(error);

    res.status(500).json({
      message: "Server error",
      status: "error"
    });

  }

});


// Login API
app.post("/api/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required",
        status: "error"
      });

    }


    const user = await User.findOne({
      email: email
    });


    if (!user) {

      return res.status(401).json({
        message: "User not found",
        status: "error"
      });

    }


    if (user.password !== password) {

      return res.status(401).json({
        message: "Incorrect password",
        status: "error"
      });

    }


    res.status(200).json({
      message: "Login successful",
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });


  } catch (error) {

    console.log("Login error");
    console.log(error);

    res.status(500).json({
      message: "Server error",
      status: "error"
    });

  }

});


// Start Server
app.listen(PORT, () => {

  console.log(
    `MAMA Health Care Server running on port ${PORT}`
  );

});