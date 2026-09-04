import { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    console.log("Login button clicked");
    console.log("Sending login request...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      console.log(
        "Login successful:",
        data
      );

      // Save logged-in user
      const loggedInUser = data.user || {
        name: data.name || "User",
        email: email.trim(),
      };

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log(
        "User saved to localStorage:",
        loggedInUser
      );

      // Send user to App.jsx
      if (onLoginSuccess) {
        onLoginSuccess(loggedInUser);
      }

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error.message ||
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-icon">
          ❤️
        </div>

        <h1>
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to MAMA Health Care
        </p>

        {error && (
          <div className="login-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
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
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>

    </div>
  );
}

export default Login;