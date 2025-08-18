import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/expense-filter-context";
import { ExpenseRecordContext } from "../../../contexts/expense-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const ExpenseMonthly = () => {
    const { isRecordLoaded, expenseRecords } = useContext(ExpenseRecordContext);
    const { filterPeriod, getCategoryList } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(expenseRecords, "month"));
    const [ category, setCategory ] = useState(getCategoryList(records));

    useEffect(() => {
        if (expenseRecords.length > 0 ) {
            const newData = filterPeriod(expenseRecords, "month");
            setRecords(newData);
            setCategory(getCategoryList(newData));
        }
    }, [expenseRecords]);

    return (
        <>
        {isRecordLoaded ?
            <div>
                <h4>Breakdown</h4>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.length === 0 ? 
                            <tr>
                                <td colSpan="2">No Transaction</td>
                            </tr> : 
                            <>
                                {category.map((category, index) => 
                                <tr key={index}>
                                    <td>{category}</td>
                                    <td id="amount">{(records.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</td>
                                </tr>)}
                            </>
                        }
                    </tbody>
                </table>
                <p className="total">Total: € {(records.reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</p>
            </div>
            : <LoadingIconSmall />
        }
        </>
    )
}
