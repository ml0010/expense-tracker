import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const Summary = () => {

    const { incomeTotal, expenseTotal, balance} = useContext(ExpenseRecordContext);

    return (
        <div className="summary">
            <div className="item income-total">
                <h5>Income Total</h5>
                <h3>€ {incomeTotal}</h3>
            </div>
            <div className="item expense-total">
                <h5>Expense Total</h5>
                <h3>€ {expenseTotal}</h3>
            </div>
            <div className="item balance">
                <h5>Balance Total</h5>
                <h3 className={`${balance > 0 ? "positive" : "negative"}`}>€ {balance}</h3>
            </div>
        </div>
    )
}
