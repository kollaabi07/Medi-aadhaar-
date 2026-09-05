import { useEffect, useState } from "react";
import "./HealthReport.css";

function HealthReport() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const [reports, setReports] = useState([]);
  const [loadingHistory, setLoadingHistory] =
    useState(false);

  const [historyError, setHistoryError] =
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
  // LOAD HEALTH HISTORY
  // =========================

  useEffect(() => {
    if (userEmail) {
      loadHealthHistory();
    }
  }, [userEmail]);

  const loadHealthHistory = async () => {
    if (!userEmail) {
      return;
    }

    try {
      setLoadingHistory(true);
      setHistoryError("");

      const response =
        await fetch(
          `http://localhost:5000/api/health-reports/${encodeURIComponent(
            userEmail
          )}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load history"
        );
      }

      setReports(
        data.reports || []
      );
    } catch (error) {
      console.log(
        "Health history error:",
        error
      );

      setHistoryError(
        "Unable to load health history."
      );
    } finally {
      setLoadingHistory(false);
    }
  };

  // =========================
  // CALCULATE BMI
  // =========================

  const calculateBMI = async () => {
    const h = Number(height);
    const w = Number(weight);

    setSavedMessage("");

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

    const heightInMeters =
      h / 100;

    const result =
      w /
      (heightInMeters *
        heightInMeters);

    const finalBMI =
      Number(result.toFixed(1));

    let finalCategory = "";
    let healthMessage = "";

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
    // SAVE TO DATABASE
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

      // Refresh history
      loadHealthHistory();
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

  // =========================
  // DELETE REPORT
  // =========================

  const deleteReport = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this health report?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response =
        await fetch(
          `http://localhost:5000/api/health-report/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete report"
        );
      }

      setReports((previousReports) =>
        previousReports.filter(
          (report) =>
            report._id !== id
        )
      );
    } catch (error) {
      console.log(
        "Delete error:",
        error
      );

      alert(
        "Unable to delete report."
      );
    }
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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

          <button
            className="calculate-btn"
            onClick={calculateBMI}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Calculate BMI"}
          </button>

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

      {/* =========================
          HEALTH HISTORY
          ========================= */}

      <div className="health-history">

        <div className="history-header">

          <h2>
            📋 Health History
          </h2>

          <button
            onClick={loadHealthHistory}
            disabled={loadingHistory}
          >
            {loadingHistory
              ? "Loading..."
              : "Refresh"}
          </button>

        </div>

        {historyError && (
          <p className="history-error">
            ❌ {historyError}
          </p>
        )}

        {loadingHistory ? (
          <div className="history-empty">
            Loading your health history...
          </div>
        ) : reports.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon">
              📊
            </div>

            <h3>
              No Health Reports Yet
            </h3>

            <p>
              Calculate your BMI to create
              your first health report.
            </p>
          </div>
        ) : (
          <div className="history-list">

            {reports.map(
              (report, index) => (
                <div
                  className="history-card"
                  key={report._id}
                >

                  <div className="history-number">
                    #{reports.length - index}
                  </div>

                  <div className="history-info">

                    <h3>
                      BMI: {report.bmi}
                    </h3>

                    <span
                      className="history-category"
                    >
                      {report.category}
                    </span>

                    <p>
                      📏 Height:{" "}
                      {report.height} cm
                    </p>

                    <p>
                      ⚖️ Weight:{" "}
                      {report.weight} kg
                    </p>

                    <small>
                      🕒{" "}
                      {formatDate(
                        report.createdAt
                      )}
                    </small>

                  </div>

                  <button
                    className="delete-report-btn"
                    onClick={() =>
                      deleteReport(
                        report._id
                      )
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>
              )
            )}

          </div>
        )}

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