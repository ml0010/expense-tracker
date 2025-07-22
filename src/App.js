import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Authentication from './pages/authentication/auth';
import Dashboard from './pages/dashboard/dashboard';
import { ExpenseRecordContextProvider } from './contexts/expense-record-context';



const CLERK_PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <div className="App">
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <Router>
                <div className='navbar'>
                    <Link to='/dashboard'>Dashboard</Link>
                    <SignedIn>
                        <UserButton showName />
                    </SignedIn>
                </div>
                <Routes>
                    <Route path="/" element={<Authentication />} />
                    <Route path="/dashboard" element={
                        <ExpenseRecordContextProvider>
                            <Dashboard />
                        </ExpenseRecordContextProvider>} />
                    <Route path="*" element={<Authentication />} />
                </Routes>
            </Router>
        </ClerkProvider>
    </div>
  );
}

export default App;
