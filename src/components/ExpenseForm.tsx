import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectInput from "./SelectInput";
import { Button, Form } from "react-bootstrap";
import DatePickerField from "./DatePickerField";
import { Expense } from "../type";

const categoryOptions = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "other", label: "Other" },
];

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  initialData?: Expense;
  mode: "add" | "edit";
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  initialData,
  mode,
}) => {
  const [expense, setExpense] = useState<Expense>({
    name: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setExpense(initialData);
    }
  }, [initialData, mode]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(expense);
    setExpense({ name: "", price: "", category: "", date: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        value={expense.name}
        onChange={(e) => setExpense({ ...expense, name: e.target.value })}
        required
      />

      <InputField
        label="Price"
        value={expense.price}
        onChange={(e) => setExpense({ ...expense, price: e.target.value })}
        required
        type="number"
        min={0}
        step={0.01}
      />

      <SelectInput
        label="Category"
        value={expense.category}
        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        options={categoryOptions}
        required
      />

      <DatePickerField
        label="Date"
        selectedDate={expense.date}
        onChange={(date) => setExpense({ ...expense, date })}
        required
      />

      <Button variant="primary" type="submit" className="mt-3">
        {mode === "edit" ? "Edit" : "Add"}
      </Button>
    </Form>
  );
};

export default ExpenseForm;
