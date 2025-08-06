import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import "../expense/expense.css"
import { useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";

export const AllRecords = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <ExpenseFilterContextProvider data="all">
                <div className="summary all-record">
                    <h1 className="title">All Records</h1>
                    <ExpenseForm />
                    <div className="tracker">
                        <div className="item">
                            <h3>Title</h3>
                            <h4>Items</h4>                    
                        </div>
                        <div className="item">
                            <h3>Title</h3>
                            <h4>Breakdown</h4>
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
export default AllRecords;
