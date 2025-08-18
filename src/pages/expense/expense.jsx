import { TransactionForm } from "../components/transaction-form/transaction-form";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";
import { MoneyIcon } from "@phosphor-icons/react";
import { ExpenseYearly } from "./components/expense-yearly";
import "./expense.css"
import { useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { ExpensePieChart } from "../components/charts/pie-charts";

export const Expense = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <TransactionFilterContextProvider data="expense">
                <div className="summary expense">
                    <h1 className="title"><MoneyIcon size={50} /> Expenses Tracker</h1>
                    <TransactionForm />
                    <div className="tracker">
                        <div className="boxes">
                            <div className="box">
                                <div className="box-content">
                                    <h3>Daily Expenses</h3>
                                    <ExpenseDaily />
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-content">
                                    <h3>Monthly Expenses</h3>
                                    <ExpenseMonthly />
                                </div>
                            </div>  
                        </div>
                        <div className="boxes">
                            <div className="box">
                                <div className="box-content">
                                    <h3>Yearly Expenses</h3>
                                    <ExpenseYearly />
                                </div>
                            </div>
                            <div className="box">
                                <div className="chart">
                                    <h3>Yearly Expenses Chart</h3>
                                    <ExpensePieChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <h3>Transactions</h3>
                        <TransactionList />
                    </div>
                </div>
            </TransactionFilterContextProvider>
        )
    }
}
export default Expense;
