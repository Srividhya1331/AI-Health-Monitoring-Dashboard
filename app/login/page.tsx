"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        router.push("/dashboard");
        return;
      }

      setError(data.error || "Login failed. Please try again.");
    } catch {
      setError("Could not connect to the server. Make sure Django is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Login</h2>

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

        <button style={styles.btn} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.registerText}>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            style={styles.link}
            onClick={() => router.push("/register")}
          >
            Create account
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
  btn: {
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  registerText: {
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
