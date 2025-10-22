import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../../../contexts/transaction-record-context';
import "./summary.css"
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { LoadingIconSmall } from '../../../components/loading-icon/loading';
import { Link } from 'react-router-dom';


export const Summary = () => {

   const { isRecordLoaded, incomeRecords, expenseRecords, getTotal } = useContext(TransactionRecordContext);

   const [ incomeTotal, setIncomeTotal ] = useState(getTotal(incomeRecords));
   const [ expenseTotal, setExpenseTotal ] = useState(getTotal(expenseRecords));

   useEffect(() => {
      setIncomeTotal(getTotal(incomeRecords));
      setExpenseTotal(getTotal(expenseRecords));
   }, [incomeRecords, expenseRecords]);

   return (
      <>
      {isRecordLoaded ?  
         <div className="dashboard-summary">
               <Link className="link" to="/all" state={{ period: "year" }}>See More</Link>
               <span className="title">Total Balance</span>
               <div className="contents">
                  <span className="balance">€ {(incomeTotal + expenseTotal).toFixed(2)}</span>
                  <div className="total">
                     <div className="items">
                           <PlusCircleIcon size={50}/>
                           <span>
                              <p className="text">Income</p>
                              <p className="number">€ {incomeTotal.toFixed(2)}</p>
                           </span>
                     </div>
                     <div className="items">
                           <MinusCircleIcon size={50}/>
                           <span>
                              <p className="text">Expense</p>
                              <p className="number">€ {(expenseTotal.toFixed(2) * -1).toFixed(2)}</p>
                           </span>
                     </div>
                  </div>
               </div>
         </div>
         : 
         <>
               <h2>Yearly Summary</h2>
               <LoadingIconSmall /> 
         </>
      }
      </>
   )
}
