import React, { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import "./summary.css"
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { LoadingIconSmall } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';


export const Summary = () => {

    const { isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(ExpenseRecordContext);

    const [ incomeTotal, setIncomeTotal ] = useState(getTotal(incomeRecords));
    const [ expenseTotal, setExpenseTotal ] = useState(getTotal(expenseRecords));

    useEffect(() => {
        setIncomeTotal(getTotal(incomeRecords));
        setExpenseTotal(getTotal(expenseRecords));
    }, [incomeRecords, expenseRecords]);

    return (
        <>
        {isRecordLoaded ?  
            <div className="dashboard-summary">
                <Link className="link" to="/all" state={{ period: "year" }}>See More</Link>
                <div className="balance">
                    <p className="balance-title">Total Balance</p>
                    <p className="balance-number">€ {(incomeTotal + expenseTotal).toFixed(2)}</p>
                </div>
                <div className="total">
                    <div className="items">
                        <PlusCircleIcon size={50}/>
                        <div>
                            <p className="text">Income</p>
                            <p className="number">€ {incomeTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="items">
                        <MinusCircleIcon size={50}/>
                        <div>
                            <p className="text">Expense</p>
                            <p className="number">€ {(expenseTotal.toFixed(2) * -1).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            : <LoadingIconSmall /> 
        }
        </>
    )
}
