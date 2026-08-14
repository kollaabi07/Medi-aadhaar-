import "./App.css";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          ❤️ MAMA <span>Health Care</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="login-btn">
          Login
        </button>
      </nav>


      {/* HERO SECTION */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO MAMA HEALTH CARE
          </p>

          <h1>
            Smart Healthcare
            <br />
            <span>For Everyone</span>
          </h1>

          <p className="description">
            Your trusted digital healthcare companion.
            Get easy access to healthcare assistance,
            smart technology and patient-friendly services
            in one place.
          </p>

          <div className="buttons">

            <button className="primary-btn">
              Get Started →
            </button>

            <button className="secondary-btn">
              Learn More
            </button>

          </div>

        </div>


        {/* HEALTHCARE CARD */}
        <div className="hero-right">

          <div className="circle">

            <div className="doctor-card">

              <div className="doctor">
                👩‍⚕️
              </div>

              <h3>
                Healthcare Assistant
              </h3>

              <p>
                Always here to help you
              </p>

              <div className="available">
                ● Available
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* SERVICES */}
      <section className="services" id="services">

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
            <div className="icon">🩺</div>
            <h3>Smart Healthcare</h3>
            <p>
              Access healthcare assistance through
              a simple and user-friendly platform.
            </p>
          </div>


          <div className="card">
            <div className="icon">🎤</div>
            <h3>Voice Assistance</h3>
            <p>
              Use voice-based interaction to make
              healthcare services easier and faster.
            </p>
          </div>


          <div className="card">
            <div className="icon">🤖</div>
            <h3>AI Assistance</h3>
            <p>
              Get intelligent assistance using
              modern AI-powered technology.
            </p>
          </div>


          <div className="card">
            <div className="icon">🔒</div>
            <h3>Secure Information</h3>
            <p>
              Keep important healthcare information
              organized and protected.
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT */}
      <section className="about" id="about">

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

          <button className="primary-btn">
            Explore MAMA Health Care →
          </button>

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


      {/* FOOTER */}
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