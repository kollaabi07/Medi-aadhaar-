import { useEffect, useState } from "react";
import "./HealthReport.css";

function HealthReport() {
  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [bmi, setBmi] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [savedMessage, setSavedMessage] =
    useState("");

  const [userEmail, setUserEmail] =
    useState("");

  // =========================
  // GET LOGGED-IN USER
  // =========================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      try {
        const user =
          JSON.parse(savedUser);

        setUserEmail(
          user.email || ""
        );
      } catch (error) {
        console.log(
          "User data error:",
          error
        );
      }
    }
  }, []);

  // =========================
  // CALCULATE BMI
  // =========================

  const calculateBMI = async () => {
    const h = Number(height);
    const w = Number(weight);

    setSavedMessage("");

    // Validation
    if (
      !h ||
      !w ||
      h <= 0 ||
      w <= 0
    ) {
      setMessage(
        "Please enter a valid height and weight."
      );

      setBmi(null);
      setCategory("");

      return;
    }

    // BMI calculation
    const heightInMeters =
      h / 100;

    const result =
      w /
      (heightInMeters *
        heightInMeters);

    const finalBMI =
      Number(
        result.toFixed(1)
      );

    let finalCategory = "";
    let healthMessage = "";

    // BMI category
    if (result < 18.5) {
      finalCategory =
        "Underweight";

      healthMessage =
        "Underweight - consider a balanced and nutritious diet.";
    } else if (result < 25) {
      finalCategory =
        "Normal";

      healthMessage =
        "Normal weight - keep maintaining a healthy lifestyle.";
    } else if (result < 30) {
      finalCategory =
        "Overweight";

      healthMessage =
        "Overweight - regular exercise and balanced meals may help.";
    } else {
      finalCategory =
        "Obesity Range";

      healthMessage =
        "Obesity range - consider discussing your health with a professional.";
    }

    setBmi(finalBMI);
    setCategory(finalCategory);
    setMessage(healthMessage);

    // =========================
    // SAVE TO MONGODB
    // =========================

    if (!userEmail) {
      setSavedMessage(
        "BMI calculated, but login is required to save the report."
      );

      return;
    }

    try {
      setSaving(true);

      const response =
        await fetch(
          "http://localhost:5000/api/health-report",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email: userEmail,
              height: h,
              weight: w,
              bmi: finalBMI,
              category:
                finalCategory,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save report"
        );
      }

      setSavedMessage(
        "✅ Health report saved successfully!"
      );
    } catch (error) {
      console.log(
        "Save health report error:",
        error
      );

      setSavedMessage(
        "BMI calculated, but report could not be saved."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="health-report">

      {/* HEADER */}

      <div className="report-header">

        <p>
          SMART HEALTH ANALYSIS
        </p>

        <h1>
          Personal Health Report
        </h1>

        <span>
          Check your BMI and understand
          your basic health information.
        </span>

      </div>

      {/* BMI SECTION */}

      <div className="report-container">

        {/* CALCULATOR CARD */}

        <div className="bmi-card">

          <div className="report-icon">
            {"\u2696\uFE0F"}
          </div>

          <h2>
            BMI Calculator
          </h2>

          <p>
            Enter your height and weight
            to calculate your BMI.
          </p>

          {/* HEIGHT */}

          <div className="input-group">

            <label>
              Height (cm)
            </label>

            <input
              type="number"
              placeholder="Example: 175"
              value={height}
              onChange={(e) =>
                setHeight(
                  e.target.value
                )
              }
            />

          </div>

          {/* WEIGHT */}

          <div className="input-group">

            <label>
              Weight (kg)
            </label>

            <input
              type="number"
              placeholder="Example: 70"
              value={weight}
              onChange={(e) =>
                setWeight(
                  e.target.value
                )
              }
            />

          </div>

          {/* BUTTON */}

          <button
            className="calculate-btn"
            onClick={calculateBMI}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Calculate BMI"}
          </button>

          {/* SAVE MESSAGE */}

          {savedMessage && (
            <p className="saved-message">
              {savedMessage}
            </p>
          )}

        </div>

        {/* RESULT CARD */}

        <div className="result-card">

          <div className="result-orb">
            {"\u2764\uFE0F"}
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
                {category}
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
                Enter your details to see
                your result.
              </span>
            </>
          )}

        </div>

      </div>

      {/* HEALTHY TIPS */}

      <div className="health-tips">

        <h2>
          {"\uD83D\uDCA1"} Healthy
          Lifestyle Tips
        </h2>

        <div className="tips-grid">

          <div className="tip">

            <span>
              {"\uD83D\uDCA7"}
            </span>

            <h3>
              Stay Hydrated
            </h3>

            <p>
              Drink enough water throughout
              the day.
            </p>

          </div>

          <div className="tip">

            <span>
              {"\uD83C\uDFC3"}
            </span>

            <h3>
              Stay Active
            </h3>

            <p>
              Include regular physical
              activity in your routine.
            </p>

          </div>

          <div className="tip">

            <span>
              {"\uD83E\uDD57"}
            </span>

            <h3>
              Eat Balanced
            </h3>

            <p>
              Choose a variety of
              nutritious foods.
            </p>

          </div>

          <div className="tip">

            <span>
              {"\uD83D\uDE34"}
            </span>

            <h3>
              Sleep Well
            </h3>

            <p>
              Give your body enough time
              to rest.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HealthReport;