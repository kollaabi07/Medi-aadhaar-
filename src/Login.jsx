import { useState } from "react";
import "./components/Login.css";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert("Login successful!");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          ❤️
        </div>

        <h1>MAMA Health Care</h1>

        <p className="login-subtitle">
          Login to your account
        </p>

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


        {/* DIVIDER */}

        <div className="divider">
          <span>OR</span>
        </div>


        {/* GOOGLE */}

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


        {/* BACK TO HOME */}

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