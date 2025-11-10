import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../../../contexts/transaction-record-context';
import { TransactionFilterContext } from '../../../../contexts/transaction-filter-context';
import './summary.css';
import { LoadingIconSmall, LoadingIconSpinner } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';

export const MonthlySummary = () => {
   const { isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(TransactionRecordContext);
   const { filterPeriod } = useContext(TransactionFilterContext);

   const getIncomeTotal = () => {
      return getTotal(filterPeriod(incomeRecords, "month"));
   };
   const getExpenseTotal = () => {
      return getTotal(filterPeriod(expenseRecords, "month"));
   };

   const [ incomeTotal, setIncomeTotal ] = useState(getIncomeTotal());
   const [ incomePercentage, setIncomePercentage ] = useState(null);
   const [ expenseTotal, setExpenseTotal ] = useState(getExpenseTotal());
   const [ expensePercentage, setExpensePercentage ] = useState(null);

   const getDaysToGo = () => {
      return (new Date(new Date().getUTCFullYear(), new Date().getMonth(), 0).getDate()) - new Date().getDate();
   }
   useEffect(() => {
      setIncomeTotal(getIncomeTotal());
      setExpenseTotal(getExpenseTotal());
      //console.log("Expense: ",expenseTotal, "Income: ",incomeTotal);

   }, [incomeRecords, expenseRecords, getTotal]);

   useEffect(() => {
      /*
      //console.log("new summary: ", getIncomeTotal());
      if (expenseRecords.length > 0 ) {
         setExpenseTotal(getExpenseTotal());
      } else {
         setExpenseTotal(0);
      }
         */

      const expenseSpent = (expenseTotal / incomeTotal) * 100;
      const incomeLeft = 100 - expenseSpent;

      if (incomeLeft > 0 && expenseSpent <= 0) {
         // income but no expense
         console.log("ONLY INCOME");
         setExpensePercentage(0);
         setExpenseTotal(0);
         setIncomePercentage(100);

      } else if (incomeLeft <= 0 && expenseSpent > 0 && incomeTotal === 0) {
         // no income but expense
         console.log("ONLY EXPENSE");
         setExpensePercentage(100);
         setIncomePercentage(0);
         setIncomeTotal(0);
      } else if (incomeLeft <= 0 && expenseSpent > 0 && incomeTotal !== 0) {
         // no income but expense
         console.log("EXPENSE BIGGER THAN INCOME");
         setExpensePercentage(100);
         setIncomePercentage(100 - expenseSpent.toFixed(0));
      } else {
         console.log("BOTH!");
         setIncomeTotal(getIncomeTotal());
         setExpensePercentage(expenseSpent.toFixed(0));
         setIncomePercentage(incomeLeft.toFixed(0));
      }

   }, [incomeTotal, expenseTotal]);

   return (
      <>
      {isRecordLoaded ? 
         <div className="summary-month contents-wrapper">
            <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
            <span className="title">Your expense this month is</span>
            <div className="contents">
               <span className="balance">€ {expenseTotal.toFixed(2)}</span>
               <span className="days">{getDaysToGo()} days left</span>
               <div className="bar-container">
                  {expenseTotal > 0 &&
                     <div className="bar expense-bar" style={{width: `${expensePercentage}%`, minWidth: '35px'}}>
                        <>
                           <span className="percent expense-percent">{expensePercentage}%</span>
                           <span className="expense-amount">({expenseTotal.toFixed(0)}€)</span>
                        </>
                     </div>
                  }
                  {incomeTotal > 0 &&
                     <div className="bar income-bar" style={{width: `${incomePercentage}%`}}>
                        {(incomePercentage > 0 && expenseTotal === 0 ) && 
                           <>
                              <span className="percent income-percent">0 %</span>
                              <span className="expense-amount">({incomeTotal.toFixed(0)}€)</span>
                           </>
                        }
                     </div>
                  }
               </div>
               <div className='numbers'>
                  <div>
                     <span>Income: </span>
                     <span>€ {incomeTotal}</span>
                  </div>                 
                  <div>
                     <span>Balance: </span>
                     <span>€ {incomeTotal - expenseTotal}</span>
                  </div>
               </div>
            </div>
         </div>
         : 
         <LoadingIconSpinner />
      }
      </>
   )
}


/*

import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../../../contexts/transaction-record-context';
import { TransactionFilterContext } from '../../../../contexts/transaction-filter-context';
import './summary.css';
import { LoadingIconSmall } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';

export const MonthlySummary = () => {
   const { isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(TransactionRecordContext);
   const { filterPeriod } = useContext(TransactionFilterContext);

   const getIncomeTotal = () => {
      return getTotal(filterPeriod(incomeRecords, "month"));
   };
   const getExpenseTotal = () => {
      return getTotal(filterPeriod(expenseRecords, "month"));
   };

   const [ incomeTotal, setIncomeTotal ] = useState(getIncomeTotal());
   const [ incomePercentage, setIncomePercentage ] = useState(null);
   const [ expenseTotal, setExpenseTotal ] = useState(getExpenseTotal());
   const [ expensePercentage, setExpensePercentage ] = useState(null);

   const getDaysToGo = () => {
      return (new Date(new Date().getUTCFullYear(), new Date().getMonth(), 0).getDate()) - new Date().getDate();
   }
   useEffect(() => {
      setIncomeTotal(getIncomeTotal());
      setExpenseTotal(getExpenseTotal());
      //console.log("Expense: ",expenseTotal, "Income: ",incomeTotal);

   }, [incomeRecords, expenseRecords, getTotal]);

   useEffect(() => {

      const expenseSpent = (expenseTotal / incomeTotal) * 100;
      const incomeLeft = 100 - expenseSpent;

      if (incomeLeft > 0 && expenseSpent <= 0) {
         // income but no expense
         console.log("ONLY INCOME");
         setExpensePercentage(0);
         setExpenseTotal(0);
         setIncomePercentage(100);

      } else if (incomeLeft <= 0 && expenseSpent > 0 && incomeTotal === 0) {
         // no income but expense
         console.log("ONLY EXPENSE");
         setExpensePercentage(100);
         setIncomePercentage(0);
         setIncomeTotal(0);
      } else if (incomeLeft <= 0 && expenseSpent > 0 && incomeTotal !== 0) {
         // no income but expense
         console.log("EXPENSE BIGGER THAN INCOME");
         setExpensePercentage(100);
         setIncomePercentage(100 - expenseSpent.toFixed(0));
      } else {
         console.log("BOTH!");
         setIncomeTotal(getIncomeTotal());
         setExpensePercentage(expenseSpent.toFixed(0));
         setIncomePercentage(incomeLeft.toFixed(0));
      }

   }, [incomeTotal, expenseTotal]);

   return (
      <>
      {isRecordLoaded ? 
         <div className="summary-month contents-wrapper">
            <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
            <span className="title">Your expense this month is</span>
            <div className="contents">
               <span className="balance">€ {expenseTotal.toFixed(2)}</span>
               <span className="days">{getDaysToGo()} days left</span>
               <div className="bar-container">
                  {expenseTotal > 0 &&
                     <div className="bar expense-bar" style={{width: `${expensePercentage}%`, minWidth: '35px'}}>
                        <>
                           <span className="percent expense-percent">{expensePercentage}%</span>
                           <span className="expense-amount">({expenseTotal.toFixed(0)}€)</span>
                        </>
                     </div>
                  }
                  {incomeTotal > 0 &&
                     <div className="bar income-bar" style={{width: `${incomePercentage}%`}}>
                        {incomePercentage > 0 && 
                        <>
                           <span className="percent income-percent">{incomePercentage}%</span>
                           <span className="expense-amount">({incomeTotal.toFixed(0)}€)</span>
                        </>
                        }
                     </div>
                  }
               </div>
               <div>
                  <div>
                     <span>Expense Total: </span>
                     <span>{expenseTotal} / {expensePercentage}%</span>
                  </div>                     
                  <div>
                     <span>Income Total: </span>
                     <span>{incomeTotal} / {incomePercentage}%</span>
                  </div>
               </div>
            </div>
         </div>
         : 
         <>
            <LoadingIconSmall />
         </>
      }
      </>
   )
}

 */