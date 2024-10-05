import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import ExpenseForm from "../components/ExpenseForm";
import { editExpense, RootState } from "../redux";
import { Expense } from "../type";
const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch the expense from the state using the id from the URL params
  const expense = useSelector((state: RootState) =>
    state.expenses.find((exp) => exp.id === id)
  );

  const handleEditExpense = (updatedExpense: Expense) => {
    dispatch(editExpense({ ...updatedExpense, id: id }));
    navigate("/");
  };

  // Show a message if the expense was not found
  if (!expense) return <p>Expense not found!</p>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="text-center fw-bold fs-4">
          Edit Expense
        </Card.Title>
        <ExpenseForm
          onSubmit={handleEditExpense}
          initialData={expense}
          mode="edit"
        />
      </Card.Body>
    </Card>
  );
};

export default EditExpense;
