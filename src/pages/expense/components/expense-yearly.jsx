import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/expense-filter-context";
import { ExpenseRecordContext } from "../../../contexts/expense-record-context";

export const ExpenseYearly = () => {
    const { expenseRecords } = useContext(ExpenseRecordContext);
    const { filterPeriod, getCategoryList } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(expenseRecords, "year"));
    const [ category, setCategory ] = useState(getCategoryList(records));

    useEffect(() => {
        if (expenseRecords.length > 0 ) {
            const newData = filterPeriod(expenseRecords, "year");
            setRecords(newData);
            setCategory(getCategoryList(newData));
        }
    }, [expenseRecords]);

    return (
        <div>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((category, index) => 
                    <tr key={index}>
                        <td>{category}</td>
                        <td id="amount">{(records.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</td>
                    </tr>)}
                </tbody>
            </table>
            <p className="total">Total: € {(records.reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</p>
        </div>
    )
}
