import { useState } from "react";
import "./components/Login.css";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {

    event.preventDefault();

    console.log("Login button clicked");

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      console.log("Sending login request...");

      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      console.log(
        "Server response status:",
        response.status
      );

      const data = await response.json();

      console.log(
        "Server response:",
        data
      );

      if (response.ok) {

        alert("Login successful! 🎉");

        console.log(
          "Logged in user:",
          data.user
        );

        setPage("home");

      } else {

        alert(
          data.message || "Login failed"
        );

      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      alert(
        "Unable to connect to server"
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

        <form onSubmit={handleLogin}>

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

          <div className="forgot-password">
            Forgot Password?
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button
          className="google-button"
        >
          🔵 Continue with Google
        </button>

        <p className="register-text">

          Don't have an account?

          <span
            onClick={() =>
              setPage("register")
            }
          >
            {" "}Register
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;