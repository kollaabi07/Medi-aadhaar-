import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "./models/User.js";
import HealthReport from "./models/HealthReport.js";

const app = express();
const PORT = 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect("mongodb://127.0.0.1:27017/mama_health_care")
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    console.log(
      "MongoDB readyState:",
      mongoose.connection.readyState
    );
  })
  .catch((error) => {
    console.log(
      "MongoDB connection failed ❌:",
      error
    );
  });

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message:
      "MAMA Health Care Backend is running",
    status: "success",
  });
});

// =========================
// REGISTER
// =========================

app.post("/api/register", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
    } = req.body;

    console.log(
      "Register Request:",
      email
    );

    if (
      !name ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
        status: "error",
      });
    }

    const existingUser =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already registered",
        status: "error",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(
      "User registered:",
      email
    );

    res.status(201).json({
      message:
        "Registration successful!",
      status: "success",
    });
  } catch (error) {
    console.log(
      "Registration error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      status: "error",
    });
  }
});

// =========================
// LOGIN
// =========================

app.post("/api/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    console.log(
      "Login Request:",
      email
    );

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
        status: "error",
      });
    }

    const user =
      await User.findOne({
        email: email.toLowerCase(),
      });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "error",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        status: "error",
      });
    }

    console.log(
      "Login successful for:",
      email
    );

    res.status(200).json({
      message:
        "Login successful!",
      status: "success",

      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log(
      "Login error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      status: "error",
    });
  }
});

// =========================
// SAVE HEALTH REPORT
// =========================

app.post(
  "/api/health-report",
  async (req, res) => {
    try {
      const {
        email,
        height,
        weight,
        bmi,
        category,
      } = req.body;

      console.log(
        "Health Report Request:",
        email
      );

      if (
        !email ||
        !height ||
        !weight ||
        bmi === undefined ||
        !category
      ) {
        return res.status(400).json({
          message:
            "All health report fields are required",
          status: "error",
        });
      }

      const report =
        new HealthReport({
          email: email.toLowerCase(),
          height,
          weight,
          bmi,
          category,
        });

      await report.save();

      console.log(
        "Health report saved for:",
        email
      );

      res.status(201).json({
        message:
          "Health report saved successfully!",
        status: "success",
        report,
      });
    } catch (error) {
      console.log(
        "Health report error:",
        error
      );

      res.status(500).json({
        message: "Server error",
        status: "error",
      });
    }
  }
);

// =========================
// GET HEALTH REPORT
// =========================

app.get(
  "/api/health-report/:email",
  async (req, res) => {
    try {
      const email =
        req.params.email.toLowerCase();

      console.log(
        "Getting health report:",
        email
      );

      const report =
        await HealthReport.findOne({
          email,
        }).sort({
          createdAt: -1,
        });

      if (!report) {
        return res.status(404).json({
          message:
            "No health report found",
          status: "error",
        });
      }

      res.status(200).json({
        message:
          "Health report found",
        status: "success",
        report,
      });
    } catch (error) {
      console.log(
        "Get health report error:",
        error
      );

      res.status(500).json({
        message: "Server error",
        status: "error",
      });
    }
  }
);

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `MAMA Health Care Server running on port ${PORT} 🚀`
  );
});