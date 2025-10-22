import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../../../contexts/transaction-record-context';
import { TransactionFilterContext } from '../../../../contexts/transaction-filter-context';
import './summary.css';
import { LoadingIconSmall } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';

export const MonthlySummary = () => {
   const { records, isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(TransactionRecordContext);
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
      console.log("new summary: ", getIncomeTotal());
      if (expenseRecords.length > 0 ) {
         setExpenseTotal(getExpenseTotal());
      } else {
         setExpenseTotal(0);
      }

      if (incomeRecords.length > 0 ) {
         setIncomeTotal(getIncomeTotal());
         setExpensePercentage((expenseTotal / incomeTotal * -100).toFixed(0));
         setIncomePercentage((100 - (expenseTotal / incomeTotal * -100)).toFixed(0));
      } else {
         setIncomeTotal(0);
         setExpensePercentage(100);
         setIncomePercentage(0);
      }

      if((expenseTotal + incomeTotal) < 0) {
         // expense is bigger than income
         setExpensePercentage(100);
         setIncomePercentage(0);
      }

      console.log(expenseTotal, " / ", incomeTotal);

   }, [isRecordLoaded]);

   return (
      <>
      {isRecordLoaded ? 
         <div className="summary-month">
               <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
               <span className="title">Your expense this month is</span>
               <div className="contents">
                  <span className="balance">€ {(expenseTotal * -1).toFixed(2)}</span>
                  <span className="days">{getDaysToGo()} days left</span>
                  <div className="bar-container">
                     {expenseTotal < 0 &&
                           <div className="bar expense-bar " style={{width: `${expensePercentage}%`, minWidth: '35px'}}>
                              {expensePercentage > 0 && 
                              <>
                                 <span className="percent expense-percent">{expensePercentage}%</span>
                                 <span className="expense-amount">({expenseTotal.toFixed(0)}€)</span>
                              </>
                              }
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
               </div>
         </div>
         : 
         <>
               <h2>Monthly Summary</h2>
               <LoadingIconSmall />
         </>
      }
      </>
   )
}
