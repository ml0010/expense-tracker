import { ExpenseForm } from "../dashboard/components/expense-form/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "../expense/expense.css"

export const AllRecords = () => {

    return (
        <div className="summary all-records">
            <h1>Summary</h1>
            <div>
                <h3>Daily Record</h3>
            </div>
            <div>
                <h3>Monthly Record</h3>
                <div>
                    <div>
                        <h4>Category</h4>
                        <p>Amount</p>
                    </div>
                </div>
            </div>
            <div>
                <ExpenseForm />
                <ExpenseFilterContextProvider>
                    <ExpenseList />
                </ExpenseFilterContextProvider>
            </div>
        </div>
    )
}
export default AllRecords;
