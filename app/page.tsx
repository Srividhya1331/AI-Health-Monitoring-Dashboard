"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/register"); // ✅ FIRST PAGE
  }, []);

  return <p>Loading...</p>;
}