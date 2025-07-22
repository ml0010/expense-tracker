import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context'

export const ExpsnseOutput = () => {

    const { records } = useContext(ExpenseRecordContext);

    return (
        <table className="expense-table">
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
    )
}
