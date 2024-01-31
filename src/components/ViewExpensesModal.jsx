import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utilities/currencyFormatter";

export default function ViewExpenseModal({ budgetId, handleClose }) {
    const { budgets, getBudgetExpenses } = useBudgets();

    let realBudgetId = budgetId
    if(UNCATEGORISED_BUDGET_ID === budgetId) {
        const unCatBid = budgets.find((b) => b.name === UNCATEGORISED_BUDGET_ID)
        realBudgetId = unCatBid._id
    }
   
    const expenses = getBudgetExpenses(realBudgetId);
    const budget = UNCATEGORISED_BUDGET_ID === budgetId
        ? { name: 'Uncategorised', id: UNCATEGORISED_BUDGET_ID }
        : budgets.find(b => b._id === budgetId);

    return (
        <Modal show={budgetId !== null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORISED_BUDGET_ID && (
                            <Button variant="outline-danger">Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense._id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
}