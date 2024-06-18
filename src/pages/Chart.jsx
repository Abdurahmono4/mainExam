import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";

const Chart = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.currentUser);
  const { documents: recipes } = useCollection("recipe", [
    "uid",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    if (recipes) {
      const categoryCounts = recipes.reduce((acc, item) => {
        const category = item.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      const categorie = Object.keys(categoryCounts);
      const counts = Object.values(categoryCounts);
      setCategories(categorie);
      setSeries(counts);
    }
  }, [recipes]);

  const options = {
    chart: {
      width: 480,
      type: "pie",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 480,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="mb-10 container-class">
      <h2 className="text-base md:text-xl font-bold mb-5">
        Statistics for the category of recipes
      </h2>
      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      </div>
    </div>
  );
};

export default Chart;
