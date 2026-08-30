import { useState } from "react";
import Login from "./Login";
import Register from "./components/Register";
import BackendTest from "./components/BackendTest";
import HealthDashboard from "./components/HealthDashboard";
import assistantImage from "./assets/healthcare-assistant.jpg";
import "./App.css";
function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const handleRegisterSuccess = () => {
    setPage("login");
  };

  if (page === "login") {
    return (
      <div className="app">
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setPage("home")}
        />
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="app">
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onBack={() => setPage("home")}
        />
      </div>
    );
  }

  if (page === "dashboard") {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo" onClick={() => setPage("home")}>
            ❤️ MAMA <span>Health Care</span>
          </div>

          <div className="nav-links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Home
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage("dashboard");
              }}
            >
              Dashboard
            </a>
          </div>

          <div className="user-section">
            <span className="welcome-user">
              Hi, {user?.name || "User"}
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
        </nav>

        <HealthDashboard />

        <footer>
          <h3>❤️ MAMA Health Care</h3>
          <p>Smart healthcare for everyone.</p>
          <p>© 2026 MAMA Health Care. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  if (page === "profile") {
    return (
      <div className="app">
        <nav className="navbar">
          <div
            className="logo"
            onClick={() => setPage("home")}
          >
            ❤️ MAMA <span>Health Care</span>
          </div>

          <div className="user-section">
            <button
              className="profile-btn"
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <section className="profile-page">
          <div className="profile-card">
            <div className="profile-icon">👤</div>

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
                <strong>Phone</strong>
                <span>{user?.mobile || "Not available"}</span>
              </p>

              <p>
                <strong>Status</strong>
                <span>Active</span>
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => setPage("dashboard")}
            >
              Health Dashboard
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app">

      <nav className="navbar">
        <div
          className="logo"
          onClick={() => setPage("home")}
        >
          ❤️ MAMA <span>Health Care</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
        </div>

        <div className="user-section">
          {user ? (
            <>
              <span className="welcome-user">
                Hi, {user.name || "User"}
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
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => setPage("login")}
              >
                Login
              </button>

              <button
                className="profile-btn"
                onClick={() => setPage("register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="small-title">
            SMART HEALTHCARE PLATFORM
          </p>

          <div className="backend-status">
            🔌 Backend Connected
          </div>

          {user && (
            <div className="welcome-message">
              Welcome back, {user.name || "User"}! ❤️
            </div>
          )}

          <h1>
            Smart Healthcare
            <br />
            <span>For Everyone</span>
          </h1>

          <p className="description">
            MAMA Health Care helps you monitor your
            health, understand your health information,
            and stay connected with smarter healthcare
            technology.
          </p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => setPage("dashboard")}
            >
              View Health Dashboard
            </button>

            {!user && (
              <button
                className="secondary-btn"
                onClick={() => setPage("register")}
              >
                Get Started
              </button>
            )}
          </div>

        </div>

        <div className="hero-right">
          <div className="health-3d-scene">

            <div className="health-orb">
              <div className="health-orb-inner">
                ❤️
              </div>
            </div>

            <div className="health-card heart-rate-card">
              <div className="health-card-icon">
                ❤️
              </div>

              <div>
                <small>Heart Rate</small>
                <h3>72 BPM</h3>
              </div>
            </div>

            <div className="health-card hydration-card">
              <div className="health-card-icon">
                💧
              </div>

              <div>
                <small>Hydration</small>
                <h3>85%</h3>
              </div>
            </div>

            <div className="health-card score-card">
              <div className="health-card-icon">
                ⭐
              </div>

              <div>
                <small>Health Score</small>
                <h3>94%</h3>
              </div>
            </div>

            <div className="health-center-card">

              <div className="doctor-small">
                <img
                  src={assistantImage}
                  alt="MAMA Health Assistant"
                />
              </div>

              <h3>MAMA AI</h3>

              <p>
                Your smart health assistant
              </p>

              <span className="ai-online">
                ● Online
              </span>

            </div>

          </div>
        </div>

      </section>

      <section className="services" id="services">

        <h2>Smart Health Services</h2>

        <p className="section-description">
          Technology-powered healthcare tools
          designed to help you understand and
          manage your health.
        </p>

        <div className="cards">

          <div className="card">
            <div className="icon">❤️</div>

            <h3>Health Monitoring</h3>

            <p>
              Monitor important health information
              and keep track of your daily wellness.
            </p>
          </div>

          <div className="card">
            <div className="icon">🤖</div>

            <h3>MAMA AI</h3>

            <p>
              Get intelligent assistance for
              understanding your health information.
            </p>
          </div>

          <div className="card">
            <div className="icon">📊</div>

            <h3>Health Dashboard</h3>

            <p>
              View your health information in one
              simple dashboard.
            </p>
          </div>

          <div className="card">
            <div className="icon">🔒</div>

            <h3>Secure Access</h3>

            <p>
              Keep your account information protected
              with secure login and registration.
            </p>
          </div>

        </div>
      </section>

      <section className="about" id="about">

        <div className="about-content">

          <p className="small-title">
            ABOUT MAMA
          </p>

          <h2>
            Healthcare
            <br />
            Made Smarter.
          </h2>

          <p>
            MAMA Health Care combines modern web
            technology with intelligent healthcare
            assistance.
          </p>

          <button
            className="primary-btn"
            onClick={() => setPage("dashboard")}
          >
            Open Dashboard
          </button>

        </div>

        <div className="about-card">

          <div className="big-heart">
            ❤️
          </div>

          <h3>
            Your Health Matters
          </h3>

          <p>
            Stay informed. Stay active. Stay healthy.
          </p>

        </div>

      </section>

      <BackendTest />

      <footer>
        <h3>❤️ MAMA Health Care</h3>

        <p>
          Smart healthcare for everyone.
        </p>

        <p>
          © 2026 MAMA Health Care. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
