import { put, takeEvery, all } from "redux-saga/effects";
import { loadExpenses } from "./expensesSlice";

function* loadExpensesSaga() {
  try {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    yield put({ type: loadExpenses.fulfilled.type, payload: expenses });
  } catch (error) {
    console.error("Error loading expenses:", error);
    yield put({
      type: loadExpenses.rejected.type,
      error: "Failed to load expenses",
    });
  }
}

export function* watchLoadExpenses() {
  yield takeEvery("expenses/loadExpenses", loadExpensesSaga);
}

export default function* rootSaga() {
  yield all([watchLoadExpenses()]);
}
