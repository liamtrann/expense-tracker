import { Expense } from "../type";

export const autofillDataOptions: Expense[] = [
  {
    name: "Lunch with Client",
    price: "30",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
  },
  {
    name: "Taxi to Airport",
    price: "50.25",
    category: "Transportation",
    date: new Date().toISOString().slice(0, 10),
  },
  {
    name: "Movie Tickets",
    price: "25.12",
    category: "Entertainment",
    date: new Date().toISOString().slice(0, 10),
  },
  {
    name: "Electricity Bill",
    price: "60",
    category: "Utilities",
    date: new Date().toISOString().slice(0, 10),
  },
  {
    name: "Groceries",
    price: "75.15",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
  },
];

export const columns = ["Name", "Price", "Category", "Date"];

export const ItemOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const categoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Transportation", label: "Transportation" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Utilities", label: "Utilities" },
  { value: "Other", label: "Other" },
];
