import './dashboard.css'
import { useContext, useState } from 'react'
import { TransactionRecordContext } from '../../contexts/transaction-record-context';
import { TransactionForm } from '../components/transaction-form/transaction-form';
import { Summary } from './components/summary/summary';
import { RecentList } from './components/recent-list/recent-list';
import { MonthlySummary } from './components/summary/summary-month';
import { ExpenseFilterContextProvider } from '../../contexts/transaction-filter-context';
import { Link } from 'react-router-dom';
import { LineChart } from '../components/charts/line-chart';
import { LoadingIcon, LoadingIconSmall } from '../components/loading-icon/loading';

export const Dashboard = () => {

    const { isRecordLoaded, incomeRecords, expenseRecords } = useContext(TransactionRecordContext);
    
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    if (loading) {
        return <LoadingIcon />;
    } else {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <TransactionForm />
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
                        <h2>Monthly Chart</h2>
                        <LineChart />
                    </div>
                    <div className="box">
                        <h2>Income</h2>
                        {isRecordLoaded ?
                        <>
                            <div className="title">
                                <p className="text">Recent Transactions</p>
                                <Link className="link" to="../income">See All</Link>
                            </div>
                            <RecentList records={incomeRecords} /> 
                        </>
                            : <LoadingIconSmall />
                        }
                    </div>
                    <div className="box">
                        <h2>Expense</h2>
                        {isRecordLoaded ?
                        <div className="recent-transaction">
                            <div className="title">
                                <p className="text">Recent Transactions</p>
                                <Link className="link" to="../expense">See All</Link>
                            </div>
                            <RecentList records={expenseRecords} /> 
                        </div>
                            : <LoadingIconSmall />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;