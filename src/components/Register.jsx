import { useState } from "react";
import "./Register.css";

function Register({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {

    event.preventDefault();

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration successful!");
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