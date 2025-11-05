import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const ExpenseDaily = () => {
   const { isRecordLoaded, expenseRecords } = useContext(TransactionRecordContext);
   const { filterPeriod } = useContext(TransactionFilterContext);

   const [ records, setRecords ] = useState(filterPeriod(expenseRecords, "month"));

   useEffect(() => {
      if (expenseRecords.length > 0 ) {
         setRecords(filterPeriod(expenseRecords, "today"));
      }
   }, [expenseRecords, filterPeriod]);

   return (
      <>
      {isRecordLoaded ? 
         <div>
            <h4>Items</h4>
            <table className="summary-table">
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Category</th>
                     <th>Description</th>
                     <th>Amount</th>
                  </tr>
               </thead>
               <tbody>
                  {records.length === 0 ? 
                     <tr>
                        <td colSpan="4">No Transaction</td>
                     </tr> : 
                     <>
                        {records.map((record, index) => 
                        <tr key={index}>
                           <td>{record.date.slice(0, 10)}</td>
                           <td>{record.category}</td>
                           <td>{record.description}</td>
                           <td id="amount">{(record.amount).toFixed(2)}</td>
                        </tr>)}
                     </>
                  }
               </tbody>
            </table>
            <p className="total">Total: € {(records.reduce((sum, record) => sum + record.amount, 0)).toFixed(2)}</p>
         </div> : 
         <LoadingIconSmall />
      }
      </>
      
   )
}