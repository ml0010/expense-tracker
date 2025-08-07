import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";
import { MoneyIcon } from "@phosphor-icons/react";
import { ExpenseYearly } from "./components/expense-yearly";
import "./expense.css"
import { useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { ExpenseChart } from "../components/charts/pie-charts";

export const Expense = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <ExpenseFilterContextProvider data="expense">
                <div className="summary expense">
                    <h1 className="title"><MoneyIcon size={50} /> Expenses Tracker</h1>
                    <ExpenseForm />
                    <div className="tracker">
                        <div className="boxes">
                            <div className="box">
                                <h3>Daily Expences</h3>
                                <h4>Items</h4>
                                <ExpenseDaily />
                            </div>
                            <div className="box">
                                <h3>Monthly Expences</h3>
                                <h4>Breakdown</h4>
                                <ExpenseMonthly />
                            </div>  
                        </div>
                        <div className="boxes">
                            <div className="box">
                                <h3>Yearly Expences</h3>
                                <div>
                                    <h4>Breakdown</h4>
                                    <ExpenseYearly />
                                </div>
                            </div>
                            <div className="box">
                                <div>
                                    <ExpenseChart />
                                </div>
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
}
export default Expense;
