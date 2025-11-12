import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../../../contexts/transaction-record-context';
import "./summary.css"
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { LoadingIconSpinner } from '../../../components/loading-icon/loading';
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
         <div className="dashboard-summary contents-wrapper">
            <Link className="link" to="/all" state={{ period: "year" }}>See More</Link>
            <span className="title">Total Balance</span>
            <div className="contents">
               <span className="balance">€ {(incomeTotal - expenseTotal).toFixed(2)}</span>
               <div className="total">
                  <div className="items">
                     <PlusCircleIcon size={45}/>
                     <span className="data">
                        <span className="text">Income</span>
                        <span className="number">€{incomeTotal.toFixed(2)}</span>
                     </span>
                  </div>
                  <div className="items">
                     <MinusCircleIcon size={45}/>
                     <span className="data">
                        <span className="text">Expense</span>
                        <span className="number">€{expenseTotal.toFixed(2)}</span>
                     </span>
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
