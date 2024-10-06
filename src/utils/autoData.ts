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
