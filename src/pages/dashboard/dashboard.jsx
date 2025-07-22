import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from './expense-form';
import { ExpsnseOutput } from './expsnse-output';
import './dashboard.css'

export const Dashboard = () => {

    const { username } = useContext(ExpenseRecordContext); 

    return (
        <div className="dashboard">
            <h1>{username}'s expenses record</h1>
            <ExpenseForm />
            <ExpsnseOutput />
        </div>
    )
}
export default Dashboard;