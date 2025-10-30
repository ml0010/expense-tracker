import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const IncomeMonthly = () => {
   const { isRecordLoaded, incomeRecords } = useContext(TransactionRecordContext);
   const { currentMonth, currentYear, filterPeriod, filterPeriodByDates } = useContext(TransactionFilterContext);

   const [ records, setRecords ] = useState(filterPeriod(incomeRecords, "month"));

   const getLastFewMonths = () => {
      const results = [];
      const numberOfMonths = 12;
      for (let i = 0; i < numberOfMonths; i++) {
         const newMonth = currentMonth - i;
         if (newMonth < 0) 
            results.push({"month": newMonth + 12, "year" : currentYear -1});
         else
            results.push({"month": newMonth, "year" : currentYear});
      }
      return results;
   };

   const [ monthList, setMonthList ] = useState(getLastFewMonths());

   const handleSelect = (option) => {
      const start = new Date(monthList[option].year, monthList[option].month, 1);
      const end = new Date(monthList[option].year, monthList[option].month + 1, 0, 23, 59, 59);
      console.log(monthList[option]);
      console.log(start);
      console.log(end);
      setRecords(filterPeriodByDates(incomeRecords, start, end));
   };
      
   const updateRecords = () => {
      setRecords(filterPeriod(incomeRecords, "month"));
   };

   useEffect(() => {
      if (incomeRecords.length > 0 ) {
         updateRecords();
      }
   }, [incomeRecords]);

   return (
      <div>
      <select onChange={(e) => {handleSelect(e.target.value)}}>
         {monthList.map((item, index) => 
            <option value={index} key={index}>{item.year}-{item.month < 9 && "0"}{item.month + 1}</option>
         )}
      </select>
      {isRecordLoaded ?
         <>
            <h4>Items</h4>
            <table className="summary-table">
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Description</th>
                     <th>Amount</th>
                  </tr>
               </thead>
               <tbody>
                  {records.length === 0 ? 
                     <tr>
                        <td colSpan="2">No Transaction</td>
                     </tr> : 
                     <>
                        {records.map((record, index) => 
                        <tr key={index}>
                           <td id="date">{record.date.slice(0, 10)}</td>
                           <td id="description">{record.description}</td>
                           <td id="amount">{record.amount.toFixed(2)}</td>
                        </tr>)}
                     </>
                  }
               </tbody>
            </table>
            <p className="total">Total: € {records.reduce((sum, record) => sum + record.amount, 0).toFixed(2)}</p>
         </>
         : <LoadingIconSmall />
      }
      </div>    
   )
}