import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import "./summary.css"
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';


export const Summary = () => {

    const { incomeTotal, expenseTotal, balance, getNumberFormat} = useContext(ExpenseRecordContext);

    return (
        <div className="dashboard-summary">
            <div className="balance">
                <p className="balance-title">Total Balance</p>
                <p className={`balance-number ${balance > 0 ? "positive" : "negative"}`}>€ {balance}</p>
            </div>
            <div className="total">
                <div className="items">
                    <PlusCircleIcon size={50}/>
                    <div>
                        <p className="text">Income</p>
                        <p className="number">€ {incomeTotal}</p>
                    </div>
                </div>
                <div className="items">
                    <MinusCircleIcon size={50}/>
                    <div>
                        <p className="text">Expense</p>
                        <p className="number">€ {expenseTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
