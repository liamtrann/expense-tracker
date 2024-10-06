import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "./DataTable";
import { deleteExpense, RootState } from "../redux";
import { Expense } from "../type";
import { formatPrice } from "../utils";
import ConfirmationModal from "../modals/ConfirmModal";
import { Button } from "react-bootstrap";
import SelectInput from "./SelectInput";
import MotionWrapper from "./MotionWrapper";
import InputField from "./InputField";

const ItemOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

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

  const columns = ["Name", "Price", "Category", "Date"];

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
          <label className="me-2 fw-bold">Page: </label>
          <SelectInput
            label=""
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            options={ItemOptions}
            required
          />
        </div>
        <div className="d-flex align-items-center mb-3">
          <label className="ms-3 me-2 fw-bold">Search: </label>
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? "primary" : "secondary"}
            onClick={() => handlePageChange(index + 1)}
            className="m-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>
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
