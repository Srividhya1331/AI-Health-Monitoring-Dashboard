"use client";

import { useState, CSSProperties, useEffect } from "react";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(u);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>⚙️ Settings</h2>
        <p style={styles.sub}>Manage your preferences</p>
      </div>

      {/* USER INFO */}
      <div style={styles.card}>
        <h3>👤 Account</h3>
        <p>Email: <b>{user}</b></p>
      </div>

      {/* EMAIL NOTIFICATIONS */}
      <div style={styles.card}>
        <div>
          <h4>Email Notifications</h4>
          <p style={styles.desc}>Receive updates via email</p>
        </div>

        <label style={styles.switch}>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
          <span style={styles.slider}></span>
        </label>
      </div>

      {/* DARK MODE */}
      <div style={styles.card}>
        <div>
          <h4>Dark Mode</h4>
          <p style={styles.desc}>Toggle theme appearance</p>
        </div>

        <label style={styles.switch}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span style={styles.slider}></span>
        </label>
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

  sub: {
    color: "#94a3b8",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  desc: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  /* TOGGLE SWITCH */
  switch: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
  },

  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#64748b",
    borderRadius: "24px",
    transition: "0.4s",
  },
};