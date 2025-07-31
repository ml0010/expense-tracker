import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/expense-filter-context";

export const IncomeMonthly = () => {
    const { recordsFiltered, filterPeriod } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(recordsFiltered, "month"));

    useEffect(() => {
        if (recordsFiltered.length > 0 )
            setRecords(filterPeriod(recordsFiltered, "month"));
    }, [recordsFiltered]);


    return (
        <div>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => 
                    <tr key={index}>
                        <td>{record.date.slice(0, 10)}</td>
                        <td>{record.description}</td>
                        <td id="amount">{record.amount.toFixed(2)}</td>
                    </tr>)}
                </tbody>
            </table>
            <p className="total">Total: € {records.reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</p>
        </div>
    )
}