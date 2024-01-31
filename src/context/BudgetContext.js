import { useContext, createContext, useState } from "react";
import axios from "axios"

const BudgetContext = createContext()

export function useBudgets(){
    return useContext(BudgetContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function getBudgets(){

    }

    function getExpenses(){

    }

    function getBudgetExpenses(){

    }

    async function addBudget(newBudget){
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/budgets/new`, newBudget)
            setBudgets([...budgets, response.data])
        } catch (e) {
            console.error("Error Sending Budget", e);
        }
    }

    function addExpense(){

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