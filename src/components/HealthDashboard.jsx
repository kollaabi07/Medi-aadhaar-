import "./HealthDashboard.css";

function HealthDashboard({ onHealthReport }) {
  return (
    <section className="health-dashboard">

      <div className="dashboard-heading">
        <p>YOUR HEALTH</p>
        <h1>Health Dashboard</h1>
        <span>
          Monitor your daily health information in one place.
        </span>
      </div>

      <div className="health-grid">

        <div className="health-box heart-box">
          <div className="health-icon">❤️</div>
          <div>
            <p>Heart Rate</p>
            <h2>
              72 <small>BPM</small>
            </h2>
          </div>
          <span className="status">Normal</span>
        </div>

        <div className="health-box pressure-box">
          <div className="health-icon">🩸</div>
          <div>
            <p>Blood Pressure</p>
            <h2>120/80</h2>
          </div>
          <span className="status">Healthy</span>
        </div>

        <div className="health-box temperature-box">
          <div className="health-icon">🌡️</div>
          <div>
            <p>Temperature</p>
            <h2>
              98.6 <small>°F</small>
            </h2>
          </div>
          <span className="status">Normal</span>
        </div>

        <div className="health-box water-box">
          <div className="health-icon">💧</div>
          <div>
            <p>Water Intake</p>
            <h2>
              85 <small>%</small>
            </h2>
          </div>
          <span className="status">Good</span>
        </div>

        <div className="health-box activity-box">
          <div className="health-icon">🏃</div>
          <div>
            <p>Daily Activity</p>
            <h2>
              7,842 <small>steps</small>
            </h2>
          </div>
          <span className="status">Active</span>
        </div>

        <div className="health-box score-box">
          <div className="health-icon">⭐</div>
          <div>
            <p>Health Score</p>
            <h2>
              94 <small>/100</small>
            </h2>
          </div>
          <span className="status">Excellent</span>
        </div>

      </div>

      <div className="ai-health-card">

        <div className="ai-circle">
          🤖
        </div>

        <div>
          <p>MAMA AI</p>

          <h2>
            Your health looks good today!
          </h2>

          <span>
            Keep drinking water and maintain your daily activity.
          </span>
        </div>

      </div>

      {/* HEALTH REPORT BUTTON */}

      <button
        className="health-report-btn"
        onClick={onHealthReport}
      >
        📋 View Full Health Report
      </button>

    </section>
  );
}

export default HealthDashboard;