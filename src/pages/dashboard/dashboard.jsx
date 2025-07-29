import './dashboard.css'
import { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from './components/expense-form/expense-form';
import { ExpenseChart, IncomeChart } from './components/charts/pie-charts';
import { Summary } from './components/summary/summary';
import { BarChart } from './components/charts/bar-chart';
import { RecentList } from './components/recent-list/recent-list';

export const Dashboard = () => {

    const { username } = useContext(ExpenseRecordContext); 


    const { incomeRecords, expenseRecords } = useContext(ExpenseRecordContext);

    return (
        <div className="dashboard">
            <h1>{username}'s Dashboard</h1>
            <ExpenseForm />
            <div className="box">
                <h2>Summary</h2>
                <Summary />
            </div>
            <div className="boxes">
                <div className="box">
                    <h2>Income Chart</h2>
                    <IncomeChart />
                </div>
                <div className="box">
                    <h2>Expense Chart</h2>
                    <ExpenseChart />
                </div>
                <div className="box">
                    <h2>Monthly Balance</h2>
                </div>
                <div className="box">
                    <h2>15 Days Expenses</h2>
                    <BarChart />
                </div>
                <div className="box">
                    <h2>Recent Incomes</h2>
                    <RecentList records={incomeRecords} /> 
                </div>                    
                <div className="box">
                    <h2>Recent Expenses</h2>
                    <RecentList records={expenseRecords} /> 
                </div>
            </div>

        </div>
    )
}
export default Dashboard;