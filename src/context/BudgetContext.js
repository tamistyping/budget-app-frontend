import { useContext, createContext, useState } from "react";
import axios from "axios";

const BudgetContext = createContext();

export const UNCATEGORISED_BUDGET_ID = "Uncategorised";

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function getBudgets() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/budgets`)
      .then((response) => {
        setBudgets(response.data);
      })
      .then(() => getExpenses())
      .catch((error) => console.error("Error fetching budgets", error));
  }

  function getExpenses() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expenses`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => console.error("Error fetching budgets", error));
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId?._id === budgetId);
  }

  async function addBudget(newBudget) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/budgets/new`,
        newBudget
      );
      setBudgets([...budgets, response.data]);
    } catch (e) {
      console.error("Error adding budget", e);
    }
  }

  async function addExpense(newExpense) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/expenses/new`,
        newExpense
      );
      setExpenses([...expenses, response.data]);
    } catch (e) {
      console.error("Error adding expense", e);
    }
  }

  function deleteBudget(budgetId) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/budgets/${budgetId}`)
      .then(() => {
        setBudgets(budgets.filter((budget) => budget._id !== budgetId));
        getBudgets();
        getExpenses();
      })
      .catch((error) => console.error("Error deleting budget:", error));
  }

  function deleteExpense(expenseId) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/expenses/${expenseId}`)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense._id !== expenseId));
        getExpenses();
      })
      .catch((error) => console.error("Error deleting expense:", error));
  }

  async function editExpense(expenseId, updatedExpense) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/expenses/${expenseId}`,
        updatedExpense
      );
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === expenseId ? response.data : expense
        )
      );
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  async function editBudget(oldName, newName) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/budgets/${oldName}`,
        { name: newName }
      );
  
      setBudgets((prevBudgets) =>
        prevBudgets.map((budget) =>
          budget.name === oldName ? response.data : budget
        )
      );
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgets,
        getExpenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
        editExpense,
        editBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};