import React from "react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseChart from "../components/ExpenseChart";

const ExpenseList: React.FC = () => {
  return (
    <div>
      <ExpenseTable />
      <div className="d-flex flex-wrap justify-content-between align-items-start mt-4">
        <div className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <ExpenseSummary />
        </div>
        <div className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
