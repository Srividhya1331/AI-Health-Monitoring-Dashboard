"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// ✅ FIX: Accept number[] instead of HealthData[]
export default function HealthChart({ data }: { data: number[] }) {
  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Heart Rate",
        data: data,
        borderColor: "red",
      },
    ],
  };

  return <Line data={chartData} />;
}