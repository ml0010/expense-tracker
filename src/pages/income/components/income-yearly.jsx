import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const IncomeYearly = () => {
    const { isRecordLoaded, incomeRecords } = useContext(TransactionRecordContext);
    const { filterPeriod, getDescriptionList } = useContext(TransactionFilterContext);

    const [ records, setRecords ] = useState(filterPeriod(incomeRecords, "year"));
    const [ category, setCategory ] = useState(getDescriptionList(records));

    useEffect(() => {
        if (incomeRecords.length > 0 ) {
            const newData = filterPeriod(incomeRecords, "year");
            setRecords(newData);
            setCategory(getDescriptionList(newData));
        }
    }, [incomeRecords]);

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
                                    <td id="amount">{records.filter((record) => record.description === category).reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</td>
                                </tr>)}
                            </>
                        }
                    </tbody>
                </table>
                <p className="total">Total: € {records.reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</p>
            </div>: 
            <LoadingIconSmall />
        }
        </> 
    )
}