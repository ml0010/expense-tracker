import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "../expense/expense.css"

export const Income = () => {

    return (
        <div className="summary income">
            <h1>Income Summary</h1>
            <div>
                <h3>Daily Income</h3>
            </div>
            <div>
                <h3>Monthly Income</h3>
                <div>
                    <div>
                        <h4>Category</h4>
                        <p>Amount</p>
                    </div>
                </div>
            </div>
            <div>
                <ExpenseForm />
                <ExpenseFilterContextProvider data="income">
                    <ExpenseList />
                </ExpenseFilterContextProvider>
            </div>
        </div>
    )
}
export default Income;
