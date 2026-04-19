"use client";

import Sidebar from "../../components/Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", background: "#020617", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}