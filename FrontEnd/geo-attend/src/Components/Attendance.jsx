import React, { useEffect, useState } from "react";

const AttendancePage = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);
        setShowError(true);
      }
    );
  }, []);

  const markAttendance = async (type) => {
    if (!currentPosition) {
      setAttendanceStatus("Location not available");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/mark-attendance/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentPosition.lat,
          lng: currentPosition.lng,
          username: username,
          type: type,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status === "success") {
        setAttendanceStatus(`Attendance ${type} marked successfully!`);
        setShowError(false);
      } else {
        setAttendanceStatus(data.message || "Failed to mark attendance.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Mark error:", error);
      setAttendanceStatus("Error marking attendance.");
      setShowError(true);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #141e30, #243b55)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        padding: "2rem",
        width:"100vw"
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1rem", fontSize: "2rem" }}>📍 Attendance</h1>

        {currentPosition ? (
          <>
            <div
              style={{
                height: "250px",
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${currentPosition.lat},${currentPosition.lng}&z=15&output=embed`}
                allowFullScreen
                title="Your Location"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <input
  type="text"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  style={{
    width: "100%",
    padding: "0.5rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    border: "1px solid #ccc",
  }}
/>

              <button
                onClick={() => markAttendance("IN")}
                style={{
                  backgroundColor: "#00C9A7",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Mark IN
              </button>
              <button
                onClick={() => markAttendance("OUT")}
                style={{
                  backgroundColor: "#FF5C58",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Mark OUT
              </button>
            </div>
          </>
        ) : (
          <p>Loading your location...</p>
        )}

        {attendanceStatus && (
          <p style={{ color: showError ? "#ff6b6b" : "#9effa9", marginTop: "1rem" }}>
            {attendanceStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
