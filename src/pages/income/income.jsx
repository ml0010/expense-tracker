import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import { IncomeMonthly } from "./components/income-monthly";
import { IncomeYearly } from "./components/income-yearly";
import { PiggyBankIcon } from "@phosphor-icons/react";
import "../expense/expense.css"
import { LoadingIcon } from "../components/loading-icon/loading";
import { useState } from "react";
import { IncomeChart } from "../components/charts/pie-charts";


export const Income = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <ExpenseFilterContextProvider data="income">
                <div className="summary income">
                    <h1 className="title"><PiggyBankIcon size={50} /> Income Tracker</h1>
                    <ExpenseForm />
                    <div className="tracker">
                        <div className="item">
                            <h3>Monthly Income</h3>
                            <h4>Items</h4>
                            <IncomeMonthly />
                        </div>
                        <div className="item">
                            <h3>Yearly Income</h3>
                            <div>
                                <h4>Breakdown</h4>
                                <IncomeYearly />
                            </div>
                            <div>
                                <IncomeChart />
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <h3>Income List</h3>
                        <ExpenseList />
                    </div>
                </div>
            </ExpenseFilterContextProvider>
        )
    }
}
export default Income;
