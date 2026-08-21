const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ===============================
// HOME API
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "MAMA Health Care Backend is running 🚀",
    status: "success"
  });
});


// ===============================
// TEST API
// ===============================

app.get("/api/test", (req, res) => {
  res.json({
    message: "MAMA Health Care API is working!",
    status: "success"
  });
});


// ===============================
// REGISTER API
// ===============================

app.post("/api/register", (req, res) => {

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
      message: "Please fill all required fields",
      status: "error"
    });
  }

  res.status(201).json({
    message: "Registration successful!",
    status: "success",
    user: {
      name,
      email,
      mobile
    }
  });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(
    `MAMA Health Care Server running on port ${PORT}`
  );
});