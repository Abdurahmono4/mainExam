import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register necessary components for ChartJS
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend, Title);

function Chart() {
  const [categoriesData, setCategoriesData] = useState({
    "Milliy taomlar": 0,
    Fastfood: 0,
    "Turk taomlari": 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const categoryCount = {
        "Milliy taomlar": 0,
        Fastfood: 0,
        "Turk taomlari": 0,
      };

      recipesList.forEach((recipe) => {
        if (categoryCount.hasOwnProperty(recipe.categories)) {
          categoryCount[recipe.categories] += 1;
        }
      });

      setCategoriesData(categoryCount);
    };

    fetchCategories();
  }, []);

  const pieData = {
    labels: Object.keys(categoriesData),
    datasets: [
      {
        label: "Recipes by Category",
        data: Object.values(categoriesData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
        // Adding data labels
        datalabels: {
          formatter: (value, context) => {
            return `${context.label}: ${value}`;
          },
          color: "#fff",
          anchor: "end",
          align: "end",
          font: {
            weight: "bold",
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Recipe Categories Distribution",
        font: {
          size: 18,
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw) {
              label += `${context.raw} recipe(s)`;
            }
            return label;
          },
        },
      },
    },
    // Adding element styling for arcs
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#fff",
      },
    },
  };

  return (
    <div className="container-class mx-auto p-4 mt-20">
      <h2 className="text-center text-2xl mb-6">Recipe Categories</h2>
      <div className="chart w-96 h-96 ">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
}

export default Chart;
