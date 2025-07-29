import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Authentication from './pages/authentication/auth';
import Dashboard from './pages/dashboard/dashboard';
import { ExpenseRecordContextProvider } from './contexts/expense-record-context';
import { Navbar } from './navbar/navbar';
import { ScrollToTop } from './scroll/scroll-to-top';
import { Income } from './pages/income/income';
import Expense from './pages/expense/expense';
import AllRecords from './pages/all-records/all-records';



const CLERK_PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <div className="App">
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Authentication />} />
                    <Route path="/dashboard" element={
                        <ExpenseRecordContextProvider>
                            <Dashboard />
                        </ExpenseRecordContextProvider>} />
                    <Route path="/income" element={
                        <ExpenseRecordContextProvider>
                            <Income />
                        </ExpenseRecordContextProvider>} />
                    <Route path="/expense" element={
                        <ExpenseRecordContextProvider>
                            <Expense />
                        </ExpenseRecordContextProvider>} />
                    <Route path="/all" element={
                        <ExpenseRecordContextProvider>
                            <AllRecords />
                        </ExpenseRecordContextProvider>} />
                    <Route path="*" element={<Authentication />} />
                </Routes>
            </Router>
            <ScrollToTop />
        </ClerkProvider>
    </div>
  );
}

export default App;
