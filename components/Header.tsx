"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // remove login token
    localStorage.removeItem("token");

    // redirect to login page
    router.replace("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>🧠 AI Health</h2>

      <ul style={styles.menu}>
        <li onClick={() => router.push("/dashboard")}>📊 Dashboard</li>
        <li onClick={() => router.push("/reports")}>📄 Reports</li>
        <li onClick={() => router.push("/settings")}>⚙️ Settings</li>
      </ul>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
};