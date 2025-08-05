import './dashboard.css'
import { useContext } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import { ExpenseForm } from '../components/expense-form/expense-form';
import { Summary } from './components/summary/summary';
import { RecentList } from './components/recent-list/recent-list';
import { MonthlySummary } from './components/summary/summary-month';
import { ExpenseFilterContextProvider } from '../../contexts/expense-filter-context';
import { Link } from 'react-router-dom';
import { BarChart } from '../components/charts/bar-chart'
import { LineChart } from '../components/charts/line-chart';

export const Dashboard = () => {

    const { incomeRecords, expenseRecords } = useContext(ExpenseRecordContext);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <ExpenseForm />
            <div className="boxes two">
                <div className="box">
                    <Summary />
                </div>
                <div className="box">
                    <ExpenseFilterContextProvider>
                        <MonthlySummary />
                    </ExpenseFilterContextProvider>
                </div>
            </div>
            <div className="boxes three">
                <div className="box">
                    <h2>Monthly Summary</h2>
                    <LineChart />
                </div>
                <div className="box">
                    <h2 className="title">Income</h2>
                    <div className="title">
                        <p className="text">Recent Incomes</p>
                        <Link className="link" to="../income">See All</Link>
                    </div>
                    <RecentList records={incomeRecords} /> 
                </div>
                <div className="box">
                    <h2>Expense</h2>

                    <div className="title">
                        <p className="text">Recent Expenses</p>
                        <Link className="link" to="../expense">See All</Link>
                    </div>
                    <RecentList records={expenseRecords} /> 
                </div>
            </div>

        </div>
    )
}
export default Dashboard;