import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import ExpenseForm from "../components/ExpenseForm";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../redux";
import { Expense } from "../type";
import { motion } from "framer-motion";

const AddExpense: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddExpense = (expense: Expense) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    dispatch(addExpense(newExpense));
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-4">
            Add Expense
          </Card.Title>
          <ExpenseForm onSubmit={handleAddExpense} mode="add" />
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default AddExpense;
