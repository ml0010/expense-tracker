import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/expense-filter-context";

export const IncomeYearly = () => {
    const { recordsFiltered, filterPeriod, getDescriptionList } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(recordsFiltered, "year"));
    const [ category, setCategory ] = useState(getDescriptionList(records));

    useEffect(() => {
        if (recordsFiltered.length > 0 ) {
            const newData = filterPeriod(recordsFiltered, "year");
            setRecords(newData);
            setCategory(getDescriptionList(newData));
        }
    }, [recordsFiltered]);

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
                        <td id="amount">{records.filter((record) => record.description === category).reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</td>
                    </tr>)}
                </tbody>
            </table>
            <p className="total">Total: € {records.reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</p>
        </div>
    )
}