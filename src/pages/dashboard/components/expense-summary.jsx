import React, { useContext } from 'react'
import { PieChart } from './pie-chart';
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const ExpenseSummary = () => {

    const { records } = useContext(ExpenseRecordContext);


    const totalIncome = records
                        .filter((record) => record.category === "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const totalExpenses = records
                        .filter((record) => record.category !== "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);




    return (
        <div className="summary">
            <h4>Total Income: € {totalIncome}</h4>
            <h4>Total Expenses: € {totalExpenses}</h4>
            <PieChart />
        </div>
    )
}
