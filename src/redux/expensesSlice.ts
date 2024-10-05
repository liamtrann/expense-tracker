import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../type";

// Define the initial state type
const initialState: Expense[] = JSON.parse(
  localStorage.getItem("expenses") || "[]"
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state));
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state));
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const newState = state.filter((exp) => exp.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addExpense, editExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
