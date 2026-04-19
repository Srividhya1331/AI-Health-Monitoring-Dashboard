"use client";

import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <div style={styles.sidebar}>
      
      {/* TOP */}
      <div>
        <h2 style={styles.logo}>🧠 AI Health</h2>

        <p style={styles.link} onClick={() => router.push("/dashboard")}>
          📊 Dashboard
        </p>

        <p style={styles.link} onClick={() => router.push("/reports")}>
          📄 Reports
        </p>

        <p style={styles.link} onClick={() => router.push("/settings")}>
          ⚙️ Settings
        </p>
      </div>

      {/* LOGOUT (BOTTOM) */}
      <button style={styles.logout} onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  sidebar: {
    width: "230px",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // 🔥 important
  },

  logo: {
    marginBottom: "20px",
  },

  link: {
    cursor: "pointer",
    marginBottom: "15px",
  },

  logout: {
    background: "#ef4444",
    padding: "10px",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};