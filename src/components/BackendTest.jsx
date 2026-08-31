import { useEffect, useState } from "react";

function BackendTest() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Backend returned an error");
        }

        const data = await response.json();

        if (data.status === "success") {
          setStatus("connected");
        } else {
          setStatus("disconnected");
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        setStatus("disconnected");
      }
    };

    checkBackend();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "500px",
        borderRadius: "15px",
        background:
          status === "connected"
            ? "#e8fff2"
            : status === "disconnected"
            ? "#fff0f0"
            : "#f0f5ff",
        color:
          status === "connected"
            ? "#16834b"
            : status === "disconnected"
            ? "#d93025"
            : "#1877f2",
        fontWeight: "700",
        fontSize: "18px",
      }}
    >
      {status === "checking" && "🔄 Checking Backend..."}

      {status === "connected" && "🟢 Backend Connected"}

      {status === "disconnected" && "🔴 Backend Not Connected"}
    </div>
  );
}

export default BackendTest;
