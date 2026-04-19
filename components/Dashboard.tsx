"use client";

import { useEffect, useState, CSSProperties } from "react";

export default function Dashboard() {
  const [user, setUser] = useState("");

  // 🔥 full health list
  const [health, setHealth] = useState<any[]>([]);

  // 🔥 latest values
  const [heartRate, setHeartRate] = useState(0);
  const [spo2, setSpo2] = useState(0);
  const [bp, setBp] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("user");

    // 🔐 protect route
    if (!token || !email) {
      window.location.href = "/login";
      return;
    }

    // 🔗 fetch with email (IMPORTANT FIX)
    fetch(`http://127.0.0.1:8000/api/dashboard/?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dashboard Data:", data);

        setUser(data.user);
        setHealth(data.data || []);

        if (data.data && data.data.length > 0) {
          const latest = data.data[data.data.length - 1];

          setHeartRate(latest.heart_rate || 0);
          setBp(latest.blood_pressure || "N/A");

          // fallback (if not in DB)
          setSpo2(latest.spo2 || 98);
          setTemp(latest.temperature || 36.5);
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Dashboard</h2>

        <div style={styles.userBox}>
          <div style={styles.avatar}>
            {user?.charAt(0).toUpperCase()}
          </div>
          <span>{user}</span>
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          ❤️ Heart Rate
          <h3>{heartRate} bpm</h3>
        </div>

        <div style={styles.card}>
          🫁 SpO2
          <h3>{spo2}%</h3>
        </div>

        <div style={styles.card}>
          🩸 Blood Pressure
          <h3>{bp}</h3>
        </div>

        <div style={styles.card}>
          🌡️ Temperature
          <h3>{temp.toFixed(1)} °C</h3>
        </div>
      </div>

      {/* STATUS */}
      <div style={styles.status}>
        {heartRate > 100 ? (
          <span style={{ color: "red" }}>⚠️ High Heart Rate</span>
        ) : (
          <span style={{ color: "#22c55e" }}>✔ Normal Condition</span>
        )}
      </div>

      {/* HISTORY */}
      <div style={styles.history}>
        <h3>📊 Health History</h3>

        {health.length === 0 ? (
          <p>No data available</p>
        ) : (
          health.map((item, i) => (
            <div key={i} style={styles.historyItem}>
              ❤️ {item.heart_rate} bpm | 🩸 BP: {item.blood_pressure}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "20px",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },

  status: {
    marginTop: "20px",
    fontSize: "18px",
  },

  history: {
    marginTop: "30px",
    background: "#020617",
    padding: "20px",
    borderRadius: "10px",
  },

  historyItem: {
    padding: "10px",
    borderBottom: "1px solid #334155",
  },
};