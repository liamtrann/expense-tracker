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

Chart.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const ExpenseChart: React.FC = () => {
  const expenses: Expense[] = useSelector((state: RootState) => state.expenses);

  const categories: string[] = [
    ...new Set(expenses.map((exp) => exp.category)),
  ];

  const categoryTotals: number[] = categories.map((category) =>
    expenses
      .filter((exp) => exp.category === category)
      .reduce((acc: number, exp: Expense) => acc + Number(exp.price), 0)
  );

  const colors = ["red", "yellow", "blue", "green", "orange", "purple"];

  const datasetColors = categoryTotals.map(
    (_, index) => colors[index % colors.length]
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryTotals,
        backgroundColor: datasetColors,
        borderColor: datasetColors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

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
