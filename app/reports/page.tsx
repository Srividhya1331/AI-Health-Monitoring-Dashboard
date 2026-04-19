"use client";

import { CSSProperties } from "react";

export default function Reports() {
  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>📄 Health Reports</h2>
        <p style={{ color: "#94a3b8" }}>Overview of your health data</p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        
        <div style={styles.card}>
          <h3>❤️ Heart Rate</h3>
          <p>Average: <b>78 bpm</b></p>
          <p style={styles.statusGood}>✔ Normal</p>
        </div>

        <div style={styles.card}>
          <h3>🫁 SpO2</h3>
          <p>Average: <b>97%</b></p>
          <p style={styles.statusGood}>✔ Healthy</p>
        </div>

        <div style={styles.card}>
          <h3>🩸 Blood Pressure</h3>
          <p>Average: <b>120/80</b></p>
          <p style={styles.statusGood}>✔ Stable</p>
        </div>

        <div style={styles.card}>
          <h3>🌡️ Temperature</h3>
          <p>Average: <b>36.6°C</b></p>
          <p style={styles.statusGood}>✔ Normal</p>
        </div>

      </div>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <h3>📊 Summary</h3>
        <p>Your health metrics are within normal range.</p>
      </div>

    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    background: "#020617",
    minHeight: "100vh",
    color: "white",
    padding: "20px",
  },

  header: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    transition: "0.3s",
  },

  statusGood: {
    color: "#22c55e",
    marginTop: "10px",
  },

  summary: {
    marginTop: "30px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
  },
};