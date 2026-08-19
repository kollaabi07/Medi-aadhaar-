const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "MAMA Health Care Backend is running 🚀",
    status: "success"
  });
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    message: "MAMA Health Care API is working!",
    status: "success"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`MAMA Health Care Server running on port ${PORT}`);
});