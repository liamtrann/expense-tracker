import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "./DataTable";
import { deleteExpense, RootState } from "../redux";
import { Expense } from "../type";
import { formatPrice } from "../utils";

const ExpenseTable: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  const columns = ["Name", "Price", "Category", "Date"];

  const tableData = expenses.map((expense: Expense) => ({
    id: expense.id,
    name: expense.name,
    price: `$${formatPrice(expense.price)}`,
    category: expense.category,
    date: expense.date,
  }));

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Expense List</h2>
      <DataTable
        columns={columns}
        data={tableData}
        onEdit={(id) => <Link to={`/edit/${id}`}>Edit</Link>}
        onDelete={handleDelete}
        noDataMessage="No expenses available."
      />
    </div>
  );
};

export default ExpenseTable;
