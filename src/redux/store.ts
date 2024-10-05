import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
