import { useEffect, useState } from "react";

function BackendTest() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend error");
        }

        return response.json();
      })
      .then(() => {
        setStatus("Backend Connected ✅");
      })
      .catch(() => {
        setStatus("Backend Not Connected ❌");
      });
  }, []);

  return (
    <div className="backend-status">
      <strong>Status:</strong> {status}
    </div>
  );
}

export default BackendTest;