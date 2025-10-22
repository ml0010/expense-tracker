import './App.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/auth';
import Dashboard from './pages/dashboard/dashboard';
import { TransactionRecordContextProvider } from './contexts/transaction-record-context';
import { Navbar } from './navbar/navbar';
import { Income } from './pages/income/income';
import { Expense } from './pages/expense/expense';
import { AllRecords}  from './pages/all-records/all-records';
import { useContext, useEffect, useState } from 'react';
import { TransactionFilterContextProvider } from './contexts/transaction-filter-context';
import { DarkModeContext } from './contexts/dark-mode-context';
import { MenuToggleContext, MenuToggleContextProvider } from './contexts/menu-toggle-context';

const CLERK_PUBLISHABLE_KEY = 'pk_test_d29ydGh5LXR1bmEtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {

   const { darkMode } = useContext(DarkModeContext);
   
   useEffect(() => {
      console.log(window.location.pathname);
      if (window.location.pathname === "/") {
         window.location.replace("/expense-tracker");
      }
   });

   return (
      <div className={`App ${darkMode && 'dark-mode'}`}>
         <ClerkProvider 
               publishableKey={CLERK_PUBLISHABLE_KEY}
               afterSignOutUrl="/expense-tracker"
         >
            <MenuToggleContextProvider>
               <TransactionRecordContextProvider>
                  <Router basename="/expense-tracker" >
                        <MenuToggleContextProvider>
                           <Navbar />
                           <RouteList />
                        </MenuToggleContextProvider>
                  </Router>
               </TransactionRecordContextProvider>
            </MenuToggleContextProvider>
         </ClerkProvider>
      </div>
   );
}

export default App;

export const RouteList = () => {

   const { showMenu } = useContext(MenuToggleContext);

   return (
      <div className={`pages ${showMenu && 'menu-active'}`}>
         <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/all" element={
               <TransactionFilterContextProvider>
                     <AllRecords />
               </TransactionFilterContextProvider>
            } />  
            <Route path="/monthly" element={<AllRecords />} />
            <Route path="/*" element={<Authentication />} />
         </Routes>
      </div>
   );
};




