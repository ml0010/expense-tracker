import React, { useContext, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context'
import { ExpenseElement } from './expense-element';

export const ExpsnseOutput = () => {

    const { records } = useContext(ExpenseRecordContext);


    const totalIncome = records
                        .filter((record) => record.category === "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const totalExpenses = records
                        .filter((record) => record.category !== "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);



    /*
    const getRows = (expense) => {
        if(records) {
            for (const [key, value] of Object.entries(expense)) {
                console.log(`${key}: ${value}`);
            }
        }
    };*/

    return (
        <div>
            <div className="summary">
                <p>Total Income: € {totalIncome}</p>
                <p>Total Expenses: € {totalExpenses}</p>
            </div>
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record ,index) => (
                        <ExpenseElement record={record} index={index}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
