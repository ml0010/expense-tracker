import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";
import { MoneyIcon } from "@phosphor-icons/react";
import { ExpenseYearly } from "./components/expense-yearly";
import "./expense.css"

export const Expense = () => {

    return (
        <ExpenseFilterContextProvider data="expense">
            <div className="summary expense">
                <h1 className="title"><MoneyIcon size={50} /> Expenses Tracker</h1>
                <ExpenseForm />
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
                <div className="list">
                    <h3>Expences List</h3>
                    <ExpenseList />
                </div>
            </div>
        </ExpenseFilterContextProvider>
    )
}
export default Expense;
