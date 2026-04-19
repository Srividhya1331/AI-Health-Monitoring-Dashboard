"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState("");

  // ✅ Get logged-in user from localStorage
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(u);
  }, []);

  // 🔴 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.replace("/login"); // ✅ Redirect to login
  };

  return (
    <div style={styles.nav}>
      {/* LEFT */}
      <h2 style={styles.title}>
        🧠 AI Health
      </h2>

      {/* RIGHT */}
      <div style={styles.right}>
        <span style={styles.user}>
          👤 {user || "User"}
        </span>

        <button style={styles.btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#1e293b",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  title: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  user: {
    color: "#cbd5f5",
  },

  btn: {
    background: "#ef4444",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};