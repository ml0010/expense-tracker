import { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import { ExpenseFilterContext } from '../../../../contexts/expense-filter-context';
import './summary.css';

export const MonthlySummary = () => {
    const { incomeRecords, expenseRecords, getTotal } = useContext(ExpenseRecordContext);
    const { filterPeriod } = useContext(ExpenseFilterContext);

    const [ incomeTotal, setIncomeTotal ] = useState(0);
    const [ expenseTotal, setExpenseTotal ] = useState(0);

    const getDaysToGo = () => {
        return (new Date(new Date().getUTCFullYear(), new Date().getMonth(), 0).getDate()) - new Date().getDate();
    }

    useEffect(() => {
        if (incomeRecords.length > 0 )
            setIncomeTotal(getTotal(filterPeriod(incomeRecords, "month")).toFixed(2));
        if (expenseRecords.length > 0 )
            setExpenseTotal(getTotal(filterPeriod(expenseRecords, "month")).toFixed(2));
    }, [incomeRecords, expenseRecords]);

    return (
        <div className="summary-month">
            <p className="text">Your expense this month is </p>
            <p className="total">€ {expenseTotal * -1}</p>
            <p className="days">{getDaysToGo()} days left</p>
            <p></p>
            <div className="bar-container">
                <div className="income-bar">
                    <p className="percent">{100 - (expenseTotal / incomeTotal * -100).toFixed(2)}%</p>
                </div>
                <div className="expense-bar" style={{width: `${expenseTotal / incomeTotal * -100}%`}}>
                    <p className="percent">{(expenseTotal / incomeTotal * -100).toFixed(2)}%</p>
                </div>
            </div>
        </div>
    )
}
