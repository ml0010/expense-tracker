import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "./expense.css"
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";

export const Expense = () => {

    return (
        <ExpenseFilterContextProvider data="expense">
            <div className="summary expense">
                <h1>Expenses Summary</h1>
                <div>
                    <h3>Daily Expences</h3>
                    <p>Items</p>
                    <ExpenseDaily />
                </div>
                <div>
                    <h3>Monthly Expences</h3>
                    <p>Breakdown</p>
                    <ExpenseMonthly />
                </div>
                <div>
                    <ExpenseForm />
                        <ExpenseList />
                </div>
            </div>
        </ExpenseFilterContextProvider>
    )
}
export default Expense;
