import React from "react";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseTable from "../components/ExpenseTable";

const ExpenseList: React.FC = () => {
  return (
    <div>
      <ExpenseSummary />
      <ExpenseTable />
    </div>
  );
};

export default ExpenseList;
