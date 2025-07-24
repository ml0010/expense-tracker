import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from './components/expense-form';
import { ExpsnseList } from './components/expsnse-list';
import './dashboard.css'
import { ExpenseSummary } from './components/expense-summary';

export const Dashboard = () => {

    const { username } = useContext(ExpenseRecordContext); 

    return (
        <div className="dashboard">
            <h1>{username}'s expenses record</h1>
            <ExpenseSummary />
            <ExpenseForm />
            <ExpsnseList />
        </div>
    )
}
export default Dashboard;