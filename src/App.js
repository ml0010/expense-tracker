import './App.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/auth';
import Dashboard from './pages/dashboard/dashboard';
import { ExpenseRecordContextProvider } from './contexts/expense-record-context';
import { Navbar } from './navbar/navbar';
import { ScrollToTop } from './scroll/scroll-to-top';
import { Income } from './pages/income/income';
import { Expense } from './pages/expense/expense';
import { AllRecords}  from './pages/all-records/all-records';
import { BackButton } from './back-button/back-button';
import { useEffect } from 'react';
import { ExpenseFilterContextProvider } from './contexts/expense-filter-context';



const CLERK_PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {

    useEffect(() => {
        console.log(window.location.pathname);
        if (window.location.pathname === "/") {
            window.location.replace("/expense-tracker");
        }
    });

    return (
        <div className="App">
            <ClerkProvider 
                publishableKey={CLERK_PUBLISHABLE_KEY}
                afterSignOutUrl="/expense-tracker"
            >
                <ExpenseRecordContextProvider>
                    <Router basename="/expense-tracker" >
                        <Routes>
                            <Route path="/" element={<Authentication />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/income" element={<Income />} />
                            <Route path="/expense" element={<Expense />} />
                            <Route path="/all" element={
                                <ExpenseFilterContextProvider>
                                    <AllRecords />
                                </ExpenseFilterContextProvider>
                            } />  
                            <Route path="/monthly" element={<AllRecords />} />
                            <Route path="/*" element={<Authentication />} />
                        </Routes>
                        <BackButton />
                        <ScrollToTop />
                        <Navbar />
                    </Router>
                </ExpenseRecordContextProvider>
            </ClerkProvider>
        </div>
    );
}

export default App;


