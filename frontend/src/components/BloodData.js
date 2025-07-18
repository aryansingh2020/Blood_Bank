// src/components/BloodData.js

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "../api/axios"; // Make sure the path is correct

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const BloodData = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBloodData = async () => {
      try {
        const res = await axios.get("blood-data"); // Your route
        const bloodPackets = res.data.data;

        // Grouping blood quantities by blood group
        const grouped = {};
        bloodPackets.forEach(packet => {
          const group = packet.bloodGroup;
          const quantity = packet.quantity;
          if (grouped[group]) {
            grouped[group] += quantity;
          } else {
            grouped[group] = quantity;
          }
        });

        // Prepare data for pie chart
        const labels = Object.keys(grouped);
        const data = Object.values(grouped);

        setChartData({
          labels,
          datasets: [
            {
              label: "Quantity (ml)",
              data,
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
                "#9966FF", "#FF9F40", "#C9CBCF", "#F7464A"
              ]
            }
          ]
        });
      } catch (err) {
        console.error("Error fetching blood data:", err);
        setError("Failed to load blood group data.");
      }
    };

    fetchBloodData();
  }, []);

  return (
    <div className=" max-w-fit max-h-fit p-6 rounded shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-500">Blood Data Distribution</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {chartData ? (
        <Pie data={chartData} />
      ) : (
        !error && <p className="text-center">Loading chart...</p>
      )}
    </div>
  );
};

export default BloodData;
