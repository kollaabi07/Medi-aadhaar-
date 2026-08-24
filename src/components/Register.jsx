import { useState } from "react";
import "./Register.css";

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!name || !email || !mobile || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! 🎉");

        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");

        setPage("login");
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          ❤️
        </div>

        <h1>MAMA Health Care</h1>

        <p className="register-subtitle">
          Create your account
        </p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>


          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>


          <div className="input-group">
            <label>Mobile</label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
          </div>


          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>


          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </div>


          <button
            type="submit"
            className="register-button"
          >
            Create Account
          </button>

        </form>


        <p className="login-text">
          Already have an account?

          <span onClick={() => setPage("login")}>
            {" "}Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;