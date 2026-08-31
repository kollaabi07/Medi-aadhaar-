```jsx
import { useState } from "react";
import "./HealthReport.css";

function HealthReport() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    const h = Number(height);
    const w = Number(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setMessage("Please enter a valid height and weight.");
      setBmi(null);
      return;
    }

    const heightInMeters = h / 100;
    const result = w / (heightInMeters * heightInMeters);

    setBmi(result.toFixed(1));

    if (result < 18.5) {
      setMessage("Underweight — consider a balanced nutritious diet.");
    } else if (result < 25) {
      setMessage("Normal weight — keep maintaining a healthy lifestyle.");
    } else if (result < 30) {
      setMessage("Overweight — regular exercise and balanced meals may help.");
    } else {
      setMessage("Obesity range — consider discussing your health with a professional.");
    }
  };

  return (
    <section className="health-report">

      <div className="report-header">
        <p>SMART HEALTH ANALYSIS</p>

        <h1>
          Personal Health Report
        </h1>

        <span>
          Check your BMI and understand your basic health information.
        </span>
      </div>

      <div className="report-container">

        <div className="bmi-card">

          <div className="report-icon">
            ⚖️
          </div>

          <h2>
            BMI Calculator
          </h2>

          <p>
            Enter your height and weight to calculate your BMI.
          </p>

          <div className="input-group">

            <label>
              Height (cm)
            </label>

            <input
              type="number"
              placeholder="Example: 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>
              Weight (kg)
            </label>

            <input
              type="number"
              placeholder="Example: 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

          </div>

          <button
            className="calculate-btn"
            onClick={calculateBMI}
          >
            Calculate BMI
          </button>

        </div>

        <div className="result-card">

          <div className="result-orb">
            ❤️
          </div>

          <p>
            YOUR BMI
          </p>

          {bmi ? (
            <>
              <h2>
                {bmi}
              </h2>

              <div className="bmi-status">
                {Number(bmi) < 18.5
                  ? "Underweight"
                  : Number(bmi) < 25
                  ? "Normal"
                  : Number(bmi) < 30
                  ? "Overweight"
                  : "Obesity Range"}
              </div>

              <span className="health-message">
                {message}
              </span>
            </>
          ) : (
            <>
              <h2>
                --
              </h2>

              <span className="health-message">
                Enter your details to see your result.
              </span>
            </>
          )}

        </div>

      </div>

      <div className="health-tips">

        <h2>
          💡 Healthy Lifestyle Tips
        </h2>

        <div className="tips-grid">

          <div className="tip">
            <span>💧</span>
            <h3>Stay Hydrated</h3>
            <p>
              Drink enough water throughout the day.
            </p>
          </div>

          <div className="tip">
            <span>🏃</span>
            <h3>Stay Active</h3>
            <p>
              Include regular physical activity in your routine.
            </p>
          </div>

          <div className="tip">
            <span>🥗</span>
            <h3>Eat Balanced</h3>
            <p>
              Choose a variety of nutritious foods.
            </p>
          </div>

          <div className="tip">
            <span>😴</span>
            <h3>Sleep Well</h3>
            <p>
              Give your body enough time to rest.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default HealthReport;
```
