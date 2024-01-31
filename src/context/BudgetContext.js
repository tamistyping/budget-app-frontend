import { useContext, createContext, useState } from "react";
import axios from "axios"

const BudgetContext = createContext()

export const UNCATEGORISED_BUDGET_ID = 'Uncategorised'

export function useBudgets(){
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function getBudgets(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/budgets`)
        .then(response => {
            setBudgets(response.data)
        })
        .then(() => getExpenses())
        .catch(err => {
            console.error("Error Fetching Budgets", err);
        })
    }

    function getExpenses(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/expenses`)
        .then(response => {
            setExpenses(response.data)
        })
        .catch(err => {
            console.error("Error Fetching Budgets", err);
        })
    }
    

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId._id === budgetId)
    }

    async function addBudget(newBudget){
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/budgets/new`, newBudget)
            setBudgets([...budgets, response.data])
        } catch (e) {
            console.error("Error Sending Budget", e);
        }
    }

    async function addExpense(newExpense){
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/expenses/new`, newExpense)
            setExpenses([...expenses, response.data])
        }
        catch(e){
            console.error('Error adding expense', e);
        }
    }

    function deleteBudget(){

    }

    function deleteExpense(){

    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgets,
            getExpenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}  
        >
            {children}
        </BudgetContext.Provider>
    )
}