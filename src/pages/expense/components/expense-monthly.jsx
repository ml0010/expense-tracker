import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const ExpenseMonthly = () => {
   const { isRecordLoaded, expenseRecords } = useContext(TransactionRecordContext);
   const { currentMonth, currentYear, filterPeriodByDates, filterPeriod, getCategoryList } = useContext(TransactionFilterContext);

   const getLastFewMonths = () => {
      const results = [];
      const numberOfMonths = 12;
      for (let i = 0; i < numberOfMonths; i++) {
         const newMonth = currentMonth - i;
         if (newMonth < 0) 
            results.push({"month": newMonth + 12, "year" : currentYear - 1});
         else
            results.push({"month": newMonth, "year" : currentYear});
      }
      return results;
   };

   const [ isLoading, setIsLoading ] = useState(true);
   const [ records, setRecords ] = useState([]);
   const [ category, setCategory ] = useState([]);
   const [ monthList, setMonthList ] = useState(getLastFewMonths());
   const [ monthPeriod, setMonthPeriod ] = useState([]);
   const [ monthSelected, setMonthSelected ] = useState(0);

   const handleSelect = (value) => {
      setMonthSelected(value);
      setIsLoading(true);
   };

   useEffect(() => {
      const month = [];
      monthList.map((item) => month.push({
         "start" : new Date(item.year, item.month, 1),
         "end": new Date(item.year, item.month + 1, 0, 23, 59, 59)
      }));
      setMonthPeriod(month);
   }, [monthList]);

   useEffect(() => {
      if (expenseRecords.length > 0 && monthPeriod.length > 0) {
         const newData = filterPeriodByDates(expenseRecords, monthPeriod[monthSelected].start, monthPeriod[monthSelected].end);
         setRecords(newData);
         setCategory(getCategoryList(newData));
      }
   }, [expenseRecords, monthPeriod, monthSelected]);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
   }, [isLoading]);


   return (
      <div>
         <div className="select-wrapper">
            <select defaultValue={monthSelected} onChange={(e) => {handleSelect(e.target.value)}}>
               {monthList.map((item, index) => 
                  <option value={index} key={index}>{item.year}-{item.month < 9 && "0"}{item.month + 1}</option>
               )}
            </select>
         </div>
         {isRecordLoaded ?
            <div className="table-wrapper">
               <h4>Breakdown</h4>
               <table className="summary-table">
                  <thead>
                     <tr>
                        <th>Category</th>
                        <th>Amount</th>
                     </tr>
                  </thead>
                  <tbody>
                     {category.length === 0 ? 
                        <tr>
                           <td colSpan="2">No Transaction</td>
                        </tr> : 
                        <>
                           {category.map((category, index) => 
                           <tr key={index}>
                              <td>{category}</td>
                              <td id="amount">{(records.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</td>
                           </tr>)}
                        </>
                     }
                  </tbody>
               </table>
               <p className="total">Total: € {(records.reduce((sum, record) => sum + record.amount, 0) * -1).toFixed(2)}</p>
               {isLoading && <LoadingIconSmall />}
            </div>
            : <LoadingIconSmall />
         }
      </div>
   )
}
