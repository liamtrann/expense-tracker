import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "./DataTable";
import { deleteExpense, RootState } from "../redux";
import { Expense } from "../type";
import { formatPrice } from "../utils";
import ConfirmationModal from "../modals/ConfirmModal";

const ExpenseTable: React.FC = () => {
  // State to handle modal visibility and selected expense for deletion
  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>("");

  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  // Handle delete button click
  const handleDeleteClick = (id: string) => {
    setSelectedExpenseId(id);
    setShowModal(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteExpense(selectedExpenseId));
    }
    setShowModal(false);
  };

  // Cancel the deletion
  const handleCancelDelete = () => {
    setSelectedExpenseId("");
    setShowModal(false);
  };

  const columns = ["Name", "Price", "Category", "Date"];

  // Map expense data to match the format expected by the DataTable component
  const tableData = expenses.map((expense: Expense) => ({
    id: expense.id,
    name: expense.name,
    price: `$${formatPrice(expense.price)}`, // Format price with a dollar sign
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
        onDelete={handleDeleteClick}
        noDataMessage="No expenses available."
      />
      <ConfirmationModal
        show={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ExpenseTable;
