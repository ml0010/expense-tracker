import { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import { ExpenseFilterContext } from '../../../../contexts/expense-filter-context';
import './summary.css';
import { LoadingIconSmall } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';

export const MonthlySummary = () => {
    const { isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(ExpenseRecordContext);
    const { filterPeriod } = useContext(ExpenseFilterContext);

    const getIncomeTotal = () => {
        return getTotal(filterPeriod(incomeRecords, "month"));
    };
    const getExpenseTotal = () => {
        return getTotal(filterPeriod(expenseRecords, "month"));
    };

    const [ incomeTotal, setIncomeTotal ] = useState(getIncomeTotal());
    const [ expenseTotal, setExpenseTotal ] = useState(getExpenseTotal());

    const getDaysToGo = () => {
        return (new Date(new Date().getUTCFullYear(), new Date().getMonth(), 0).getDate()) - new Date().getDate();
    }

    useEffect(() => {
        if (incomeRecords.length > 0 )
            setIncomeTotal(getIncomeTotal());
        if (expenseRecords.length > 0 )
            setExpenseTotal(getExpenseTotal());
    }, [incomeRecords, expenseRecords]);

    return (
        <>
        {isRecordLoaded ? 
            <div className="summary-month">
                <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
                <p className="text">Your expense this month is </p>
                <p className="total">€ {(expenseTotal * -1).toFixed(2)}</p>
                <p className="days">{getDaysToGo()} days left</p>
                <p></p>
                <div className="bar-container">
                    <div className="expense-bar " style={{width: `${expenseTotal / incomeTotal * -100}%`}}>
                        <p className="percent expense-percent">{(expenseTotal / incomeTotal * -100).toFixed(2)}%</p>
                    </div>
                    <div className="income-bar" style={{width: `${100 - (expenseTotal / incomeTotal * -100)}%`}}>
                        <p className="percent income-percent" style={{width: `${100 - (expenseTotal / incomeTotal * -100)}%`}}>{(100 - (expenseTotal / incomeTotal * -100)).toFixed(2)}%</p>
                    </div>

                </div>
            </div>
            : 
            <>
                <h2>Monthly Summary</h2>
                <LoadingIconSmall />
            </>
        }
        </>
    )
}
