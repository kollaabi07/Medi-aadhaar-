import { useState } from "react";
import "./components/Login.css";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
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

      console.log("Login Response:", data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          ❤️
        </div>

        <h1>
          MAMA Health Care
        </h1>

        <p className="login-subtitle">
          Login to your account
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


        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="input-group">

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
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* FORGOT PASSWORD */}

          <div className="forgot-password">
            Forgot Password?
          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        {/* GOOGLE */}

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-button"
          onClick={() =>
            alert("Google login will be added later.")
          }
        >
          🔵 Continue with Google
        </button>


        {/* REGISTER */}

        <p className="register-text">

          Don't have an account?

          <span
            onClick={() => setPage("register")}
          >
            {" "}Register
          </span>

        </p>


        {/* BACK HOME */}

        <button
          type="button"
          className="back-home"
          onClick={() => setPage("home")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;