import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSpinner } from "../../components/loading-icon/loading";

export const ExpenseDaily = () => {
   const { isRecordLoaded, expenseRecords } = useContext(TransactionRecordContext);
   const { filterPeriodByDates } = useContext(TransactionFilterContext);

   const [ records, setRecords ] = useState([]);
   const [ dateList, setDateList ] = useState([]);
   const [ dateSelected, setDateSelected ] = useState(0);
   const [ isLoading, setIsLoading ] = useState(true);

   useEffect(() => {

      const dates = [];

      for (let i = 0; i < 7; i++) {
         const start = new Date();
         start.setDate(new Date().getDate() - i);
         start.setHours(0, 0, 0, 0);         
         const end = new Date();
         end.setDate(new Date().getDate() - i);
         end.setHours(23, 59, 59, 0);

         const year = start.getFullYear();
         const month = (start.getMonth() + 1).toString();
         const date = start.getDate().toString();
         const newDate = year + "-" + `${month.length === 1 ? "0" + month : month}` + "-" + `${date.length === 1 ? "0" + date : date}`;

         if (new Date(Math.min(...expenseRecords.map((record) => new Date(record.date)))) < start) {
            dates.push({"date": newDate, "start": start, "end": end});
         } else {
            return;
         }
      }
      setDateList(dates);
   }, [expenseRecords]);

   useEffect(() => {
      if (expenseRecords.length > 0 && dateList.length > 0) {
         setRecords(filterPeriodByDates(expenseRecords, dateList[dateSelected].start, dateList[dateSelected].end));
      }
   }, [dateSelected, dateList]);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
   }, [isLoading]);

   const handleDateChange = (value) => {
      setDateSelected(value);
      setIsLoading(true);
   };

   return (
      <div>
         <div className="select-wrapper">
            <select defaultValue={""} onChange={(e) => {handleDateChange(e.target.value)}}>
               {dateList.map((date, index) => 
                  <option value={index} key={index}>{date["date"]}</option>
               )}
            </select>
         </div>
         {isRecordLoaded ? 
            <div className="table-wrapper">
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
               {isLoading && <LoadingIconSpinner />}
            </div> : 
            <LoadingIconSpinner />
         }
      </div>
   )
}