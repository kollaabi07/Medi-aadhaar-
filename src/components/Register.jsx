import { useState } from "react";
import "./Register.css";

function Register({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/register",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage(data.message);

      // Clear form
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };


  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          ❤️
        </div>

        <h1>
          MAMA Health Care
        </h1>

        <p className="register-subtitle">
          Create your account
        </p>


        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}


        {/* ERROR MESSAGE */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleRegister}>

          {/* NAME */}

          <div className="register-input">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>


          {/* EMAIL */}

          <div className="register-input">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>


          {/* MOBILE */}

          <div className="register-input">

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(event) =>
                setMobile(event.target.value)
              }
            />

          </div>


          {/* PASSWORD */}

          <div className="register-input">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="register-input">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }

            />

          </div>


          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="register-button"
          >
            Create Account
          </button>

        </form>


        {/* LOGIN LINK */}

        <p className="login-link">

          Already have an account?

          <span
            onClick={() => setPage("login")}
          >
            {" "}Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;