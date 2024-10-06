import React from "react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseSummary from "../components/ExpenseSummary";
import ExpenseChart from "../components/ExpenseChart";
import { motion } from "framer-motion";

const ExpenseList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <ExpenseTable />
      <div className="d-flex flex-wrap justify-content-between align-items-start mt-4">
        <div className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <ExpenseSummary />
        </div>
        <div className="flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <ExpenseChart />
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseList;
