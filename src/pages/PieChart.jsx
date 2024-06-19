import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS-ga kerakli komponentlarni qo'shamiz
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#FF6384", // Milliy taomlar
          "#36A2EB", // Fast Food
          "#FFCE56", // Turk taomlari
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h2>Recipe Categories</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
