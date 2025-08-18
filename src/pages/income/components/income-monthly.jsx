import { useContext, useEffect, useState } from "react"
import { ExpenseFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const IncomeMonthly = () => {
    const { isRecordLoaded, incomeRecords } = useContext(TransactionRecordContext);
    const { filterPeriod } = useContext(ExpenseFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(incomeRecords, "month"));

    useEffect(() => {
        if (incomeRecords.length > 0 )
            setRecords(filterPeriod(incomeRecords, "month"));
    }, [incomeRecords]);


    return (
        <>
        {isRecordLoaded ?
            <div>
                <h4>Items</h4>
                <table className="summary-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? 
                            <tr>
                                <td colSpan="2">No Transaction</td>
                            </tr> : 
                            <>
                                {records.map((record, index) => 
                                <tr key={index}>
                                    <td>{record.date.slice(0, 10)}</td>
                                    <td>{record.description}</td>
                                    <td id="amount">{record.amount.toFixed(2)}</td>
                                </tr>)}
                            </>
                        }
                    </tbody>
                </table>
                <p className="total">Total: € {records.reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</p>
            </div>
            : <LoadingIconSmall />
        }
        </>    
    )
}