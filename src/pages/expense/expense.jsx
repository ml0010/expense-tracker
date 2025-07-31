import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "./expense.css"
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";
import { MoneyIcon } from "@phosphor-icons/react";
import { ExpenseYearly } from "./components/expense-yearly";

export const Expense = () => {

    return (
        <ExpenseFilterContextProvider data="expense">
            <div className="summary expense">
                <h1 className="title"><MoneyIcon size={50} /> Expenses Tracker</h1>
                <div className="tracker">
                    <div className="item">
                        <h3>Daily Expences</h3>
                        <h4>Items</h4>
                        <ExpenseDaily />
                    </div>
                    <div className="group">
                        <div className="item">
                            <h3>Monthly Expences</h3>
                            <h4>Breakdown</h4>
                            <ExpenseMonthly />
                        </div>                    
                        <div className="item">
                            <h3>Yearly Expences</h3>
                            <h4>Breakdown</h4>
                            <ExpenseYearly />
                        </div>
                    </div>
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
