import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from './expense-form';

export const Dashboard = () => {

    const { username } = useContext(ExpenseRecordContext); 

    return (
        <div>
            <h1>{username}'s dashboard</h1>
            <ExpenseForm />
        </div>
    )
}
export default Dashboard;