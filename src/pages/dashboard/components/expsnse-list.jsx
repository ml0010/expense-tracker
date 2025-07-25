import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context'
import { ExpenseListElement } from './expense-list-element';

export const ExpsnseList = () => {

    const { records } = useContext(ExpenseRecordContext);

    /*
    const getRows = (expense) => {
        if(records) {
            for (const [key, value] of Object.entries(expense)) {
                console.log(`${key}: ${value}`);
            }
        }
    };*/

    return (
        <div className="expense-table-warpper">
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
                        <ExpenseListElement record={record} key={index}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
