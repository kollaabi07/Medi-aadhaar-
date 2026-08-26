const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const app = express();

const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect("mongodb://127.0.0.1:27017/mama_health_care")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// ===============================
// HOME TEST
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "MAMA Health Care Backend is running",
    status: "success"
  });
});

// ===============================
// REGISTER
// ===============================

app.post("/api/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password
    } = req.body;

    console.log("New Registration:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Mobile:", mobile);

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
        status: "error"
      });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  mobile,
  password: hashedPassword
});

await newUser.save();

    console.log("User saved successfully");

    res.status(201).json({
      message: "Registration successful!",
      status: "success"
    });

  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      message: "Server error",
      status: "error"
    });
  }
});

// ===============================
// LOGIN
// ===============================

app.post("/api/login", async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    console.log("Login Request:");
    console.log("Email:", email);

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
      console.log("User not found");

      return res.status(401).json({
        message: "User not found",
        status: "error"
      });
    }

   const passwordMatch = await bcrypt.compare(
  password,
  user.password
);

if (!passwordMatch) {
  console.log("Incorrect password");

  return res.status(401).json({
    message: "Incorrect password",
    status: "error"
  });
}

    console.log("Login successful for:", email);

    res.status(200).json({
      message: "Login successful!",
      status: "success",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (error) {

    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error",
      status: "error"
    });
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `MAMA Health Care Server running on port ${PORT}`
  );
});