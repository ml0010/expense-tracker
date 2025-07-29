import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "./expense.css"

export const Expense = () => {

    return (
        <div className="summary expense">
            <h1>Expenses Summary</h1>
            <div>
                <h3>Daily Expences</h3>
            </div>
            <div>
                <h3>Monthly Expences</h3>
                <div>
                    <div>
                        <h4>Category</h4>
                        <p>Amount</p>
                    </div>
                </div>
            </div>
            <div>
                <ExpenseForm />
                <ExpenseFilterContextProvider data="expense">
                    <ExpenseList />
                </ExpenseFilterContextProvider>
            </div>
        </div>
    )
}
export default Expense;
