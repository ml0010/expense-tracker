import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const SummaryMonthly = ({ type }) => {
   const { isRecordLoaded, expenseRecords, incomeRecords } = useContext(TransactionRecordContext);
   const { currentMonth, currentYear, filterPeriodByDates, getCategoryList } = useContext(TransactionFilterContext);

   const [ records, setRecords ] = useState([]);
   const [ outputRecords, setOutputRecords ] = useState([]);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ category, setCategory ] = useState([]);
   const [ monthList, setMonthList ] = useState([]);
   const [ monthPeriod, setMonthPeriod ] = useState([]);
   const [ monthSelected, setMonthSelected ] = useState(0);

   useEffect(() => {
      if(isRecordLoaded) {
         if (type === "expense") {
            setRecords(expenseRecords);
            getLastFewMonths(expenseRecords);
         }
         else if (type === "income") {
            setRecords(incomeRecords);
            getLastFewMonths(incomeRecords);
         }
      }
   }, [isRecordLoaded, type]);


   useEffect(() => {
      if (records.length > 0 && monthPeriod.length > 0) {
         const newData = filterPeriodByDates(records, monthPeriod[monthSelected].start, monthPeriod[monthSelected].end);
         setOutputRecords(newData);
         setCategory(getCategoryList(newData));
      }
   }, [records, monthPeriod, monthSelected]);

   useEffect(() => {
      const month = [];
      monthList.map((item) => month.push({
         "start" : new Date(item.year, item.month, 1),
         "end": new Date(item.year, item.month + 1, 0, 23, 59, 59)
      }));
      setMonthPeriod(month);
   }, [monthList]);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
   }, [isLoading]);


   const getLastFewMonths = (records) => {
      const results = [];
      const yearMin = new Date(records[records.length-1].date).getFullYear();
      const monthMin = new Date(records[records.length-1].date).getMonth();
      const numberOfMonths = 1000;
      
      for (let year = currentYear; year >= yearMin; year--) {
         var startMonth = null;
         var lastMonth = null;

         if (year === currentYear) {
            startMonth = currentMonth;
            lastMonth = 0;
         } else if (year === yearMin) {
            startMonth = 12;
            lastMonth = monthMin;
         } else {
            startMonth = 12;
            lastMonth = 0;
         }
         for (let month = startMonth; (month >= lastMonth && results.length < numberOfMonths); month--) {
            results.push({"month": month, "year" : year});
         }
      }
      setMonthList(results);
   };

   const handleSelect = (value) => {
      setMonthSelected(value);
      setIsLoading(true);
   };

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
                  {type === "expense" &&
                  <>
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
                                 <td id="amount">{(outputRecords.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0)).toFixed(2)}</td>
                              </tr>)}
                           </>
                        }
                     </tbody>
                  </>
                  }
                  {type === "income" &&
                  <>
                     <thead>
                        <tr>
                           <th>Date</th>
                           <th>Description</th>
                           <th>Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                        {outputRecords.length === 0 ? 
                           <tr>
                              <td colSpan="3">No Transaction</td>
                           </tr> : 
                           <>
                              {outputRecords.map((record, index) => 
                              <tr key={index}>
                                 <td id="date">{record.date.slice(0, 10)}</td>
                                 <td id="description">{record.description}</td>
                                 <td id="amount">{record.amount.toFixed(2)}</td>
                              </tr>)}
                           </>
                        }
                     </tbody>
                  </>
                  }
               </table>
               <p className="total">Total: € {(outputRecords.reduce((sum, record) => sum + record.amount, 0)).toFixed(2)}</p>
               {isLoading && <LoadingIconSmall />}
            </div>
            : <LoadingIconSmall />
         }
      </div>
   )
}
