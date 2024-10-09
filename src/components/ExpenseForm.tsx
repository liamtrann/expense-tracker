import React, { useEffect, useState } from "react";
import InputField from "./fields/InputField";
import SelectInput from "./fields/SelectInput";
import { Button, Form } from "react-bootstrap";
import DatePickerField from "./fields/DatePickerField";
import { Expense } from "../type";
import { autofillDataOptions, categoryOptions } from "../utils";

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

  // Function to autofill the form with random data
  const handleAutofill = () => {
    const randomIndex = Math.floor(Math.random() * autofillDataOptions.length);
    const randomExpense = autofillDataOptions[randomIndex];
    setExpense(randomExpense);
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

      {/* Autofill Button */}
      <Button
        variant="secondary"
        onClick={handleAutofill}
        className="mt-3 ms-2"
      >
        Autofill
      </Button>
    </Form>
  );
};

export default ExpenseForm;
