"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "../../components/Dashboard";

export default function Page() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login"); // 🔐 protect route
    } else {
      setOk(true); // ✅ allow access
    }
  }, [router]);

  // ⏳ Prevent flicker before auth check
  if (!ok) {
    return (
      <p style={{ color: "white", padding: "20px" }}>
        Loading dashboard...
      </p>
    );
  }

  return <Dashboard />;
}