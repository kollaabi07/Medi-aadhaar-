import { useEffect, useState } from "react";

function BackendTest() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server response failed");
        }

        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setStatus("Backend Connected");
      })
      .catch((error) => {
        console.error(error);
        setStatus("Backend Not Connected");
        setError("Unable to connect to the backend.");
      });
  }, []);

  return (
    <div className="backend-test">

      <h2>
        MAMA Health Care Backend
      </h2>

      <p>
        Status:
        {" "}
        <strong>
          {status}
        </strong>
      </p>

      {message && (
        <p>
          {message}
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

    </div>
  );
}

export default BackendTest;