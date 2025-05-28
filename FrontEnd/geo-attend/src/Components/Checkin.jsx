import React, { useState } from "react";

export default function Checkin() {
  const [status, setStatus] = useState("");

  const handleCheckin = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch("http://127.0.0.1:8000/api/mark", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat: latitude, lng: longitude }),
          });

          const data = await response.json();
          setStatus(data.message);
        } catch (error) {
          setStatus("Error marking attendance: " + error.message);
        }
      },
      () => {
        setStatus("Permission denied.");
      }
    );
  };

  return (
    <div>
      <button onClick={handleCheckin}>Mark Attendance</button>
      <p>{status}</p>
    </div>
  );
}
