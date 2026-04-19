"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registered successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 700);
        return;
      }

      setError(data.error || "Registration failed. Please try again.");
    } catch {
      setError("Could not connect to the server. Make sure Django is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.heading}>Register</h2>

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <button style={styles.btn} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <button
            type="button"
            style={styles.link}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "420px",
  },
  heading: {
    color: "white",
    marginTop: 0,
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    background: "#020617",
    color: "#fff",
    border: "1px solid #334155",
  },
  error: {
    background: "#7f1d1d",
    border: "1px solid #ef4444",
    color: "#fee2e2",
    margin: "0 0 10px",
    padding: "10px",
  },
  success: {
    background: "#14532d",
    border: "1px solid #22c55e",
    color: "#dcfce7",
    margin: "0 0 10px",
    padding: "10px",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  loginText: {
    marginTop: "15px",
    marginBottom: 0,
    color: "#94a3b8",
    textAlign: "center",
  },
  link: {
    appearance: "none",
    background: "transparent",
    border: "none",
    color: "#22c55e",
    cursor: "pointer",
    fontWeight: "bold",
    padding: 0,
  },
};
