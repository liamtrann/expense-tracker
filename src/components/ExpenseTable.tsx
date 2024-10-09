// src/components/ExpenseTable.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "./fields/DataTable";
import { deleteExpense, RootState } from "../redux";
import { Expense } from "../type";
import { columns, formatPrice, ItemOptions } from "../utils";
import ConfirmationModal from "../modals/ConfirmModal";
import { Button } from "react-bootstrap";
import SelectInput from "./fields/SelectInput";
import MotionWrapper from "./fields/MotionWrapper";
import InputField from "./fields/InputField";
import Pagination from "./fields/Pagination";

const ExpenseTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Default items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input

  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  const handleDeleteClick = (id: string) => {
    setSelectedExpenseId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpenseId) {
      dispatch(deleteExpense(selectedExpenseId));
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedExpenseId("");
    setShowModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense: Expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const tableData = filteredExpenses.map((expense: Expense) => ({
    id: expense.id,
    name: expense.name,
    price: `$${formatPrice(expense.price)}`,
    category: expense.category,
    date: expense.date,
  }));

  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle change for items per page
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on items per page change
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Expense List</h2>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center mb-3">
          <label className="me-1 fw-bold">Page </label>
          <SelectInput
            label=""
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            options={ItemOptions}
            required
          />
        </div>
        <div className="d-flex align-items-center mb-3">
          <InputField
            label=""
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <MotionWrapper key={currentPage}>
        <DataTable
          columns={columns}
          data={paginatedData}
          onEdit={(id) => <Link to={`/edit/${id}`}>Edit</Link>}
          onDelete={handleDeleteClick}
          noDataMessage="No expenses available."
        />
      </MotionWrapper>
      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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
