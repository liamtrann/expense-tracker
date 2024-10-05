import React from "react";
import { useSelector } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";
import { calculateExpensesByCategory, formatPrice } from "../utils";
import { RootState } from "../redux";
import { Expense } from "../type";

const ExpenseSummary: React.FC = () => {
  const expenses = useSelector(
    (state: RootState) => state.expenses as Expense[]
  );

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (total, exp) => total + Number(exp.price),
    0
  );

  const expensesByCategory = calculateExpensesByCategory(expenses);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="text-center fw-bold fs-4">
          Expense Summary
        </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Total Expenses: ${formatPrice(totalExpenses)}
          </ListGroup.Item>
          {Object.keys(expensesByCategory).map((category) => (
            <ListGroup.Item key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}: $
              {formatPrice(expensesByCategory[category])}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ExpenseSummary;
