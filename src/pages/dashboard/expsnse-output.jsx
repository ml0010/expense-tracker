import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context'

export const ExpsnseOutput = () => {

    const { records } = useContext(ExpenseRecordContext);

    const totalIncome = records
                        .filter((record) => record.category === "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const totalExpenses = records
                        .filter((record) => record.category !== "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);
    return (
        <div>
            <div className="summary-output">
                <p>Total Income: {totalIncome}</p>
                <p>Total Expenses: {totalExpenses}</p>
            </div>
            <table className="expense-output">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
