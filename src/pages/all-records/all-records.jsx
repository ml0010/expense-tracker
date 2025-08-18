import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContext } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import "../expense/expense.css"
import { useContext, useEffect, useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { useLocation } from "react-router-dom";

export const AllRecords = () => {

    const [loading, setLoading] = useState(true);

    const { handlePeriodChange } = useContext(ExpenseFilterContext);

    const location = useLocation();
    const { period, start, end } = location.state || "";

    useEffect(() => {
        handlePeriodChange(period, start, end);
    }, [period]);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <div className="summary all-record">
                <h1 className="title">All Records</h1>
                <ExpenseForm />
                <div className="list">
                    <h3>Transactions</h3>
                    <ExpenseList />
                </div>
            </div>
        )
    }
}
export default AllRecords;
