import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Expense } from "../type";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart.js components
Chart.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const ExpenseChart: React.FC = () => {
  // Fetching expenses from Redux store
  const expenses: Expense[] = useSelector((state: RootState) => state.expenses);

  // Extract unique categories from expenses
  const categories: string[] = [
    ...new Set(expenses.map((exp) => exp.category)),
  ];

  // Calculate the total amount for each category
  const categoryTotals: number[] = categories.map((category) =>
    expenses
      .filter((exp) => exp.category === category)
      .reduce((acc: number, exp: Expense) => acc + Number(exp.price), 0)
  );

  // Predefined colors for bar chart
  const colors = ["red", "yellow", "blue", "green", "orange", "purple"];

  // Assign colors to each category's total
  const datasetColors = categoryTotals.map(
    (_, index) => colors[index % colors.length]
  );

  // Chart data setup
  const data = {
    labels: categories, // Categories will be the x-axis labels
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryTotals, // Y-axis data
        backgroundColor: datasetColors, // Assign background colors
        borderColor: datasetColors.map((color) => color.replace("0.6", "1")), // Adjust opacity for borders
        borderWidth: 1,
      },
    ],
  };

  // Chart options to start y-axis at 0
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="text-center mb-3 fw-bold">Chart Expenses by Category</h4>
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
