import React, { useContext, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context'

export const ExpsnseOutput = () => {

    const [ newValue, setNewValue ] = useState("");

    const { records, deleteRecord } = useContext(ExpenseRecordContext);

    const totalIncome = records
                        .filter((record) => record.category === "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const totalExpenses = records
                        .filter((record) => record.category !== "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const handleDelete = (id) => {
        deleteRecord(id);
    }

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
                        <tr key={index} id={expense._id}>
                            <td>
                                <input className={`input`} value={expense.date}></input>
                            </td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <button onClick={(e) => handleDelete(e.target.parentElement.id)}>DELETE</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
