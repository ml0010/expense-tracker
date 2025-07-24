import React, { useContext } from 'react'
import { ExpenseChart, IncomeChart } from './charts';
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import { BarChart } from './bar-chart';

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
            <h4>Total Income: € {totalIncome.toFixed(2)}</h4>
            <h4>Total Expenses: € {totalExpenses.toFixed(2) * -1}</h4>
            <IncomeChart amount={totalIncome} />
            <ExpenseChart amount={totalExpenses} />
            <BarChart />
        </div>
    )
}
