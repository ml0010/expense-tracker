import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/expense-filter-context";

export const ExpenseYearly = () => {
    const { recordsFiltered, filterPeriod, getCategoryList } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(recordsFiltered, "year"));
    const [ category, setCategory ] = useState(getCategoryList(records));

    useEffect(() => {
        if (recordsFiltered.length > 0 ) {
            const newData = filterPeriod(recordsFiltered, "year");
            setRecords(newData);
            setCategory(getCategoryList(newData));
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
                        <td id="amount">{(records.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</td>
                    </tr>)}
                </tbody>
            </table>
            <p className="total">Total: € {(records.reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</p>
        </div>
    )
}
