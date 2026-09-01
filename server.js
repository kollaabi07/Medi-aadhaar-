import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mama_health_care")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// Test backend
app.get("/", (req, res) => {
  res.json({
    message: "MAMA Health Care Backend is running",
    status: "success",
  });
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
        status: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User registered:", email);

    res.status(201).json({
      message: "Registration successful!",
      status: "success",
    });
  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      message: "Server error",
      status: "error",
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        status: "error",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "error",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        status: "error",
      });
    }

    console.log("Login successful for:", email);

    res.status(200).json({
      message: "Login successful!",
      status: "success",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error",
      status: "error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`MAMA Health Care Server running on port ${PORT}`);
});