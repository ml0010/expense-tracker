import { TransactionForm } from "../components/transaction-form/transaction-form";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import { IncomeMonthly } from "./components/income-monthly";
import { IncomeYearly } from "./components/income-yearly";
import { PiggyBankIcon } from "@phosphor-icons/react";
import "../expense/expense.css"
import { LoadingIcon } from "../components/loading-icon/loading";
import { useState } from "react";
import { IncomePieChart } from "../components/charts/pie-charts";


export const Income = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <TransactionFilterContextProvider data="income">
                <div className="summary income">
                    <h1 className="title"><PiggyBankIcon size={50} /> Income Tracker</h1>
                    <TransactionForm />
                    <div className="tracker">
                        <div className="boxes">
                            <div className="box">
                                <div className="box-content">
                                    <h3>Monthly Income</h3>
                                    <IncomeMonthly />
                                </div>
                            </div>
                        </div>
                        <div className="boxes">
                            <div className="box">
                                <div className="box-content">
                                    <h3>Yearly Income</h3>
                                    <IncomeYearly />
                                </div>
                            </div>
                            <div className="box">
                                <div className="chart">
                                    <h3>Yearly Income Chart</h3>
                                    <IncomePieChart />
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
export default Income;
