import { Expense } from "../type";

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const calculateExpensesByCategory = (
  expenses: Expense[]
): Record<string, number> => {
  return expenses.reduce((acc: Record<string, number>, expense: Expense) => {
    const { category, price } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(price);
    return acc;
  }, {});
};

export function formatPrice(value: string | number): string {
  const number = parseFloat(value.toString());

  if (isNaN(number)) return value.toString();

  const fixedNumber = number.toFixed(2);
  const [integerPart, decimalPart] = fixedNumber.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return `${formattedIntegerPart}.${decimalPart}`;
}
