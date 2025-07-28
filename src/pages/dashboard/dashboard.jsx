import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from './components/expense-form';
import { ExpsnseList } from './components/expense-list';
import './dashboard.css'
import { ExpenseSummary } from './components/expense-summary';
import { ExpenseFilterContextProvider } from '../../contexts/expense-filter-context';
import { ExpenseListFilter } from './components/expense-list-filter';

export const Dashboard = () => {

    const { username } = useContext(ExpenseRecordContext); 

    return (
        <div className="dashboard">
            <h1>{username}'s expenses record</h1>
            <ExpenseFilterContextProvider>
                <ExpenseSummary />
                <ExpenseForm />
                <ExpenseListFilter />
                <ExpsnseList />
            </ExpenseFilterContextProvider>
        </div>
    )
}
export default Dashboard;