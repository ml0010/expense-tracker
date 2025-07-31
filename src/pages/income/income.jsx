import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "../expense/expense.css"
import { IncomeMonthly } from "./components/income-monthly";
import { IncomeYearly } from "./components/income-yearly";

export const Income = () => {

    return (
        <div className="summary income">
            <h1>Income Summary</h1>
            <div>
                <h3>Monthly Income</h3>
                <p>Items</p>
                <IncomeMonthly />
            </div>
            <div>
                <h3>Yearly Income</h3>
                <p>Breakdown</p>
                <IncomeYearly />
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
