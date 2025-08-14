import { ExpenseForm } from "../components/expense-form/expense-form";
import { ExpenseFilterContext, ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../components/list/expense-list";
import "../expense/expense.css"
import { useContext, useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { useLocation } from "react-router-dom";

export const AllRecords = () => {

    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const period = location.state ? location.state.period : "all";
    const month = location.state ? location.state.month : "no month";

    console.log(location);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <ExpenseFilterContextProvider period={period} >
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
                        <h3>List</h3>
                        <ExpenseList />
                    </div>
                </div>
            </ExpenseFilterContextProvider>
        )
    }
}
export default AllRecords;
