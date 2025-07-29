import { useContext } from "react";
import { ExpenseRecordContext } from "../../contexts/expense-record-context";
import { ExpenseForm } from "../dashboard/components/expense-form";
import { ExpenseFilterContextProvider } from "../../contexts/expense-filter-context";
import { ExpenseList } from "../dashboard/components/expense-list";
import "./expense.css"

export const Expense = () => {

    const { username } = useContext(ExpenseRecordContext); 

    return (
        <div className="expense">
            <h1>{username}'s expenses record</h1>
                <ExpenseForm />

                <ExpenseFilterContextProvider>
                    <ExpenseList />
                </ExpenseFilterContextProvider>
        </div>
    )
}
export default Expense;
