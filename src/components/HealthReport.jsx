import { useEffect, useState } from "react";
import jsPDF from "jspdf";
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
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // =========================
  // GET LOGGED-IN USER
  // =========================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserEmail(user.email || "");
      } catch (error) {
        console.log("User data error:", error);
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

      const response = await fetch(
        `http://localhost:5000/api/health-reports/${encodeURIComponent(
          userEmail
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load history"
        );
      }

      setReports(data.reports || []);
    } catch (error) {
      console.log("Health history error:", error);

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

    if (!h || !w || h <= 0 || w <= 0) {
      setMessage(
        "Please enter a valid height and weight."
      );

      setBmi(null);
      setCategory("");

      return;
    }

    const heightInMeters = h / 100;

    const result =
      w / (heightInMeters * heightInMeters);

    const finalBMI = Number(result.toFixed(1));

    let finalCategory = "";
    let healthMessage = "";

    if (result < 18.5) {
      finalCategory = "Underweight";

      healthMessage =
        "Underweight - consider a balanced and nutritious diet.";
    } else if (result < 25) {
      finalCategory = "Normal";

      healthMessage =
        "Normal weight - keep maintaining a healthy lifestyle.";
    } else if (result < 30) {
      finalCategory = "Overweight";

      healthMessage =
        "Overweight - regular exercise and balanced meals may help.";
    } else {
      finalCategory = "Obesity Range";

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

      const response = await fetch(
        "http://localhost:5000/api/health-report",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: userEmail,
            height: h,
            weight: w,
            bmi: finalBMI,
            category: finalCategory,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save report"
        );
      }

      setSavedMessage(
        "✅ Health report saved successfully!"
      );

      await loadHealthHistory();
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this health report?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/health-report/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete report"
        );
      }

      setReports((previousReports) =>
        previousReports.filter(
          (report) => report._id !== id
        )
      );
    } catch (error) {
      console.log("Delete error:", error);

      alert("Unable to delete report.");
    }
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================
  // BMI TREND
  // =========================

  const getBMIChange = () => {
    if (reports.length < 2) {
      return null;
    }

    const latest = Number(reports[0].bmi);
    const previous = Number(reports[1].bmi);

    return Number(
      (latest - previous).toFixed(1)
    );
  };

  const bmiChange = getBMIChange();

  const getTrendText = () => {
    if (bmiChange === null) {
      return "Not enough data to calculate your BMI trend.";
    }

    if (bmiChange > 0) {
      return `Your BMI increased by ${bmiChange} compared with your previous report.`;
    }

    if (bmiChange < 0) {
      return `Your BMI decreased by ${Math.abs(
        bmiChange
      )} compared with your previous report.`;
    }

    return "Your BMI is unchanged from your previous report.";
  };

  const getTrendIcon = () => {
    if (bmiChange === null) {
      return "📊";
    }

    if (bmiChange > 0) {
      return "📈";
    }

    if (bmiChange < 0) {
      return "📉";
    }

    return "➡️";
  };

  // =========================
  // BMI RANGE POSITION
  // =========================

  const getBMIPosition = (value) => {
    const numericBMI = Number(value);

    const min = 15;
    const max = 40;

    let position =
      ((numericBMI - min) /
        (max - min)) *
      100;

    if (position < 0) {
      position = 0;
    }

    if (position > 100) {
      position = 100;
    }

    return position;
  };

  // =========================
  // HEALTH INSIGHTS
  // =========================

  const getAverageBMI = () => {
    if (reports.length === 0) {
      return "--";
    }

    const total = reports.reduce(
      (sum, report) =>
        sum + Number(report.bmi),
      0
    );

    return (total / reports.length).toFixed(1);
  };

  const getLowestBMI = () => {
    if (reports.length === 0) {
      return "--";
    }

    return Math.min(
      ...reports.map((report) =>
        Number(report.bmi)
      )
    ).toFixed(1);
  };

  const getHighestBMI = () => {
    if (reports.length === 0) {
      return "--";
    }

    return Math.max(
      ...reports.map((report) =>
        Number(report.bmi)
      )
    ).toFixed(1);
  };

  const getOverallInsight = () => {
    if (reports.length < 2) {
      return "Keep recording your BMI to understand your health progress over time.";
    }

    if (bmiChange > 0) {
      return "Your latest BMI is higher than your previous report. Continue focusing on regular physical activity and balanced nutrition.";
    }

    if (bmiChange < 0) {
      return "Your latest BMI is lower than your previous report. Keep maintaining healthy lifestyle habits.";
    }

    return "Your latest BMI is similar to your previous report. Continue maintaining your healthy habits.";
  };

  // =========================
  // SHARE HEALTH REPORT
  // =========================

  const shareHealthReport = async () => {
    const shareText = `
MAMA Health Care - Health Report

BMI: ${bmi ?? "Not calculated"}
Category: ${category || "Not available"}
Height: ${height ? `${height} cm` : "Not available"}
Weight: ${weight ? `${weight} kg` : "Not available"}

Generated from MAMA Health Care.
    `.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title: "MAMA Health Care Report",
          text: shareText,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          shareText
        );

        alert(
          "Health report copied to clipboard!"
        );
      } else {
        alert(
          "Sharing is not supported on this browser."
        );
      }
    } catch (error) {
      console.log(
        "Share cancelled or failed:",
        error
      );
    }
  };

  // =========================
  // DAY 28 - DOWNLOAD PDF
  // =========================

  const downloadHealthReport = () => {
    if (!bmi && reports.length === 0) {
      alert(
        "Please calculate your BMI before downloading the report."
      );

      return;
    }

    const pdf = new jsPDF();

    const latestReport =
      reports.length > 0
        ? reports[0]
        : null;

    const pdfBMI =
      bmi ?? latestReport?.bmi ?? "--";

    const pdfCategory =
      category ||
      latestReport?.category ||
      "Not available";

    const pdfHeight =
      height ||
      latestReport?.height ||
      "--";

    const pdfWeight =
      weight ||
      latestReport?.weight ||
      "--";

    // =========================
    // PDF HEADER
    // =========================

    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "MAMA HEALTH CARE",
      20,
      25
    );

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      "Personal Health Report",
      20,
      36
    );

    pdf.setLineWidth(0.5);

    pdf.line(
      20,
      42,
      190,
      42
    );

    // =========================
    // BASIC INFORMATION
    // =========================

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Current Health Information",
      20,
      55
    );

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      `BMI: ${pdfBMI}`,
      25,
      68
    );

    pdf.text(
      `Category: ${pdfCategory}`,
      25,
      78
    );

    pdf.text(
      `Height: ${pdfHeight} cm`,
      25,
      88
    );

    pdf.text(
      `Weight: ${pdfWeight} kg`,
      25,
      98
    );

    pdf.text(
      `Email: ${userEmail || "Not available"}`,
      25,
      108
    );

    // =========================
    // HEALTH MESSAGE
    // =========================

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Health Message",
      20,
      125
    );

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    const healthText =
      message ||
      "Maintain a balanced lifestyle and monitor your health regularly.";

    const healthLines =
      pdf.splitTextToSize(
        healthText,
        165
      );

    pdf.text(
      healthLines,
      25,
      137
    );

    // =========================
    // HEALTH ANALYTICS
    // =========================

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Health Analytics",
      20,
      160
    );

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      `Total Reports: ${reports.length}`,
      25,
      173
    );

    pdf.text(
      `Average BMI: ${getAverageBMI()}`,
      25,
      183
    );

    pdf.text(
      `Lowest BMI: ${getLowestBMI()}`,
      25,
      193
    );

    pdf.text(
      `Highest BMI: ${getHighestBMI()}`,
      25,
      203
    );

    pdf.text(
      `BMI Change: ${
        bmiChange === null
          ? "--"
          : bmiChange > 0
          ? `+${bmiChange}`
          : bmiChange
      }`,
      25,
      213
    );

    // =========================
    // TREND
    // =========================

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "BMI Progress",
      20,
      230
    );

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    const trendText =
      getTrendText();

    const trendLines =
      pdf.splitTextToSize(
        trendText,
        165
      );

    pdf.text(
      trendLines,
      25,
      242
    );

    // =========================
    // FOOTER
    // =========================

    pdf.setFontSize(9);

    pdf.text(
      "Generated by MAMA Health Care",
      20,
      280
    );

    pdf.text(
      `Generated on: ${new Date().toLocaleString(
        "en-IN"
      )}`,
      20,
      287
    );

    pdf.save(
      "MAMA-Health-Care-Report.pdf"
    );
  };

  // =========================
  // RENDER
  // =========================

  return (
    <section className="health-report">

      {/* HEADER */}

      <div className="report-header">
        <p>SMART HEALTH ANALYSIS</p>

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

        {/* CALCULATOR */}

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

          {/* DAY 28 BUTTONS */}

          <div className="report-actions">

            <button
              className="share-report-btn"
              onClick={shareHealthReport}
            >
              📤 Share Report
            </button>

            <button
              className="download-report-btn"
              onClick={downloadHealthReport}
            >
              📄 Download PDF
            </button>

          </div>

        </div>

        {/* RESULT */}

        <div className="result-card">

          <div className="result-orb">
            {"\u2764\uFE0F"}
          </div>

          <p>YOUR BMI</p>

          {bmi ? (
            <>
              <h2>{bmi}</h2>

              <div className="bmi-status">
                {category}
              </div>

              <span className="health-message">
                {message}
              </span>
            </>
          ) : (
            <>
              <h2>--</h2>

              <span className="health-message">
                Enter your details to see
                your result.
              </span>
            </>
          )}

        </div>

      </div>

      {/* BMI TREND */}

      <div className="bmi-trend">

        <div className="trend-header">

          <div>
            <p>
              HEALTH ANALYTICS
            </p>

            <h2>
              📊 BMI Trend
            </h2>
          </div>

          <div className="trend-count">
            {reports.length}{" "}
            {reports.length === 1
              ? "Report"
              : "Reports"}
          </div>

        </div>

        {reports.length === 0 ? (

          <div className="trend-empty">

            <div>📊</div>

            <h3>
              Your BMI Trend Will Appear Here
            </h3>

            <p>
              Calculate your BMI to start
              tracking your progress.
            </p>

          </div>

        ) : (

          <>

            {/* SUMMARY */}

            <div className="trend-summary">

              <div className="trend-summary-card">

                <span>
                  Latest BMI
                </span>

                <strong>
                  {reports[0].bmi}
                </strong>

                <small>
                  {reports[0].category}
                </small>

              </div>

              <div className="trend-summary-card">

                <span>
                  Previous BMI
                </span>

                <strong>
                  {reports.length > 1
                    ? reports[1].bmi
                    : "--"}
                </strong>

                <small>
                  {reports.length > 1
                    ? reports[1].category
                    : "No previous report"}
                </small>

              </div>

              <div className="trend-summary-card">

                <span>
                  BMI Change
                </span>

                <strong>
                  {bmiChange === null
                    ? "--"
                    : bmiChange > 0
                    ? `+${bmiChange}`
                    : bmiChange}
                </strong>

                <small>
                  {getTrendIcon()}{" "}
                  {bmiChange === null
                    ? "Need more data"
                    : "Since previous report"}
                </small>

              </div>

            </div>

            {/* BMI SCALE */}

            <div className="bmi-scale-section">

              <h3>
                BMI Range
              </h3>

              <div className="bmi-scale">

                <div className="scale-track">

                  <div
                    className="scale-marker"
                    style={{
                      left: `${getBMIPosition(
                        reports[0].bmi
                      )}%`,
                    }}
                  >
                    <span>
                      {reports[0].bmi}
                    </span>
                  </div>

                </div>

                <div className="scale-labels">

                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>

                </div>

              </div>

              <div className="scale-categories">

                <span>
                  Underweight
                </span>

                <span>
                  Normal
                </span>

                <span>
                  Overweight
                </span>

                <span>
                  Obesity
                </span>

              </div>

            </div>

            {/* TREND MESSAGE */}

            <div className="trend-message">

              <span>
                {getTrendIcon()}
              </span>

              <div>
                <h3>
                  BMI Progress
                </h3>

                <p>
                  {getTrendText()}
                </p>
              </div>

            </div>

            {/* CHART */}

            <div className="trend-chart">

              <h3>
                BMI History Chart
              </h3>

              <div className="chart-area">

                {reports
                  .slice()
                  .reverse()
                  .map((report) => {

                    const chartBMI =
                      Number(
                        report.bmi
                      );

                    const minBMI = 15;
                    const maxBMI = 40;

                    let heightPercent =
                      ((chartBMI -
                        minBMI) /
                        (maxBMI -
                          minBMI)) *
                      100;

                    if (
                      heightPercent < 10
                    ) {
                      heightPercent = 10;
                    }

                    if (
                      heightPercent > 100
                    ) {
                      heightPercent = 100;
                    }

                    return (
                      <div
                        className="chart-column"
                        key={report._id}
                      >

                        <div className="chart-value">
                          {report.bmi}
                        </div>

                        <div
                          className="chart-bar"
                          style={{
                            height: `${heightPercent}%`,
                          }}
                        />

                        <small>
                          {new Date(
                            report.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </small>

                      </div>
                    );
                  })}

              </div>

            </div>

          </>

        )}

      </div>

      {/* HEALTH INSIGHTS */}

      <div className="health-insights">

        <div className="insights-header">

          <p>
            SMART HEALTH ANALYSIS
          </p>

          <h2>
            🧠 Health Insights
          </h2>

          <span>
            A quick summary of your BMI
            history and progress.
          </span>

        </div>

        {reports.length === 0 ? (

          <div className="insights-empty">

            <div className="insights-empty-icon">
              📊
            </div>

            <h3>
              No Insights Yet
            </h3>

            <p>
              Calculate your BMI to generate
              personalized health insights.
            </p>

          </div>

        ) : (

          <>

            <div className="insights-grid">

              <div className="insight-card">

                <div className="insight-card-icon">
                  📊
                </div>

                <span>
                  Average BMI
                </span>

                <strong>
                  {getAverageBMI()}
                </strong>

              </div>

              <div className="insight-card">

                <div className="insight-card-icon">
                  ⬇️
                </div>

                <span>
                  Lowest BMI
                </span>

                <strong>
                  {getLowestBMI()}
                </strong>

              </div>

              <div className="insight-card">

                <div className="insight-card-icon">
                  ⬆️
                </div>

                <span>
                  Highest BMI
                </span>

                <strong>
                  {getHighestBMI()}
                </strong>

              </div>

              <div className="insight-card">

                <div className="insight-card-icon">
                  📋
                </div>

                <span>
                  Total Reports
                </span>

                <strong>
                  {reports.length}
                </strong>

              </div>

            </div>

            <div className="overall-insight">

              <div className="insight-icon">
                {bmiChange === null
                  ? "💡"
                  : bmiChange > 0
                  ? "📈"
                  : bmiChange < 0
                  ? "📉"
                  : "➡️"}
              </div>

              <div>

                <h3>
                  Overall Progress
                </h3>

                <p>
                  {getOverallInsight()}
                </p>

              </div>

            </div>

            <div className="health-reminder">

              <div className="reminder-icon">
                💡
              </div>

              <div>

                <h3>
                  Healthy Reminder
                </h3>

                <p>
                  BMI is a general screening
                  measure and does not provide
                  a complete picture of individual
                  health. Maintain balanced
                  nutrition, regular physical
                  activity, adequate sleep, and
                  consult a qualified healthcare
                  professional for personalized
                  advice.
                </p>

              </div>

            </div>

          </>

        )}

      </div>

      {/* HEALTH HISTORY */}

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

                    <span className="history-category">
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

