import { useState } from "react";
import Login from "./Login";
import Register from "./components/Register";
import BackendTest from "./components/BackendTest";
import assistantImage from "./assets/healthcare-assistant.jpg";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  // Get logged-in user from localStorage
  const savedUser = localStorage.getItem("loggedInUser");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    localStorage.removeItem("loggedInUser");
  }

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setPage("home");
    alert("Logged out successfully 👋");
  };

  // ==============================
  // LOGIN PAGE
  // ==============================
  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  // ==============================
  // REGISTER PAGE
  // ==============================
  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  // ==============================
  // PROFILE PAGE
  // ==============================
  if (page === "profile") {
    return (
      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-icon">
            👤
          </div>

          <h1>My Profile</h1>

          <div className="profile-info">

            <p>
              <strong>Name</strong>
              <span>{user?.name || "User"}</span>
            </p>

            <p>
              <strong>Email</strong>
              <span>{user?.email || "Not available"}</span>
            </p>

            <p>
              <strong>Mobile</strong>
              <span>{user?.mobile || "Not available"}</span>
            </p>

            <p>
              <strong>Status</strong>
              <span>Active ✅</span>
            </p>

          </div>

          <div className="profile-buttons">

            <button
              className="primary-btn"
              onClick={() => setPage("home")}
            >
              ← Back to Home
            </button>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==============================
  // HOME PAGE
  // ==============================
  return (
    <div className="app">

      {/* ==============================
          NAVBAR
      ============================== */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          ❤️ MAMA
          <span> Health Care</span>
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

        {user ? (

          <div className="user-section">

            <span className="welcome-user">
              👤 {user.name}
            </span>

            <button
              className="profile-btn"
              onClick={() => setPage("profile")}
            >
              Profile
            </button>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>

        )}

      </nav>

      {/* ==============================
          HERO SECTION
      ============================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO MAMA HEALTH CARE
          </p>

          <BackendTest />

          <h1>
            Smart Healthcare
            <br />
            <span>For Everyone</span>
          </h1>

          <p className="description">
            Your trusted digital healthcare companion.
            Get easy access to healthcare assistance,
            smart technology and patient-friendly
            services in one place.
          </p>

          {user && (
            <div className="welcome-message">
              Welcome back,
              <strong> {user.name}</strong>! 👋
            </div>
          )}

          <div className="buttons">

            {!user && (
              <button
                className="primary-btn"
                onClick={() => setPage("login")}
              >
                Get Started →
              </button>
            )}

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              Learn More
            </button>

          </div>

        </div>

        {/* ==============================
            DAY 16 - 3D HEALTH DASHBOARD
        ============================== */}

        <div className="hero-right">

          <div className="health-3d-scene">

            {/* CENTRAL ORB */}

            <div className="health-orb">

              <div className="health-orb-inner">
                ❤️
              </div>

            </div>

            {/* HEART RATE */}

            <div className="health-card heart-rate-card">

              <div className="health-card-icon">
                ❤️
              </div>

              <div>
                <small>
                  Heart Rate
                </small>

                <h3>
                  72 BPM
                </h3>
              </div>

            </div>

            {/* HYDRATION */}

            <div className="health-card hydration-card">

              <div className="health-card-icon">
                💧
              </div>

              <div>
                <small>
                  Hydration
                </small>

                <h3>
                  85%
                </h3>
              </div>

            </div>

            {/* HEALTH SCORE */}

            <div className="health-card score-card">

              <div className="health-card-icon">
                🩺
              </div>

              <div>
                <small>
                  Health Score
                </small>

                <h3>
                  94%
                </h3>
              </div>

            </div>

            {/* AI ASSISTANT CARD */}

            <div className="health-center-card">

              <div className="doctor-small">

                <img
                  src={assistantImage}
                  alt="Healthcare Assistant"
                />

              </div>

              <h3>
                MAMA AI
              </h3>

              <p>
                Your Health Assistant
              </p>

              <span className="ai-online">
                ● Online
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* ==============================
          SERVICES
      ============================== */}

      <section
        className="services"
        id="services"
      >

        <p className="small-title">
          OUR FEATURES
        </p>

        <h2>
          Why Choose MAMA Health Care?
        </h2>

        <p className="section-description">
          Simple and intelligent healthcare support
          designed for everyone.
        </p>

        <div className="cards">

          <div className="card">

            <div className="icon">
              🩺
            </div>

            <h3>
              Smart Healthcare
            </h3>

            <p>
              Access healthcare assistance through
              a simple and user-friendly platform.
            </p>

          </div>

          <div className="card">

            <div className="icon">
              🎤
            </div>

            <h3>
              Voice Assistance
            </h3>

            <p>
              Use voice-based interaction to make
              healthcare services easier and faster.
            </p>

          </div>

          <div className="card">

            <div className="icon">
              🤖
            </div>

            <h3>
              AI Assistance
            </h3>

            <p>
              Get intelligent assistance using
              modern AI-powered technology.
            </p>

          </div>

          <div className="card">

            <div className="icon">
              🔒
            </div>

            <h3>
              Secure Information
            </h3>

            <p>
              Keep important healthcare information
              organized and protected.
            </p>

          </div>

        </div>

      </section>

      {/* ==============================
          ABOUT
      ============================== */}

      <section
        className="about"
        id="about"
      >

        <div className="about-content">

          <p className="small-title">
            ABOUT US
          </p>

          <h2>
            Your Health,
            <br />
            Our Priority
          </h2>

          <p>
            MAMA Health Care is a smart healthcare
            platform designed to make healthcare
            assistance simple, accessible and
            technology-driven.
          </p>

          {!user && (
            <button
              className="primary-btn"
              onClick={() => setPage("login")}
            >
              Get Started →
            </button>
          )}

        </div>

        <div className="about-card">

          <div className="big-heart">
            💙
          </div>

          <h3>
            Care + Technology
          </h3>

          <p>
            Making healthcare easier through
            modern technology.
          </p>

        </div>

      </section>

      {/* ==============================
          FOOTER
      ============================== */}

      <footer id="contact">

        <h3>
          ❤️ MAMA Health Care
        </h3>

        <p>
          Smart Healthcare • Better Care • Better Life
        </p>

        <p>
          © 2026 MAMA Health Care
        </p>

      </footer>

    </div>
  );
}

export default App;