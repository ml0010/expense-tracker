import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const SummaryYearly = ({ type }) => {
   const { isRecordLoaded, expenseRecords, incomeRecords } = useContext(TransactionRecordContext);
   const { currentYear, filterPeriodByDates, getCategoryList } = useContext(TransactionFilterContext);

   const [ records, setRecords ] = useState([]);
   const [ outputRecords, setOutputRecords ] = useState([]);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ category, setCategory ] = useState([]);
   const [ yearList, setYearList ] = useState([]);
   const [ yearPeriod, setYearPeriod ] = useState([]);
   const [ yearSelected, setYearSelected ] = useState(0);

   const handleSelect = (value) => {
      setYearSelected(value);
      setIsLoading(true);
   };

   useEffect(() => {

      const getLastFewYears = (records) => {
         const results = [];
         const yearMinimum = new Date(records[records.length-1].date).getFullYear();
         for (let i = 0; i < (currentYear - yearMinimum + 1); i++) {
            const newYear = currentYear - i;
            if (newYear >= yearMinimum)
               results.push(newYear);
         }
         setYearList(results);
      };

      if(isRecordLoaded) {
         if (type === "expense" && expenseRecords.length > 0) {
            setRecords(expenseRecords);
            getLastFewYears(expenseRecords);
         }
         else if (type === "income" && incomeRecords.length > 0) {
            setRecords(incomeRecords);
            getLastFewYears(incomeRecords);
         }
      }
   }, [isRecordLoaded, type, incomeRecords, expenseRecords, currentYear]);

   useEffect(() => {
      const year = [];
      yearList.map((item) => year.push({
         "start" : new Date(item, 0, 1),
         "end": new Date(item, 12, 0, 23, 59, 59)
      }));
      setYearPeriod(year);
   }, [yearList]);

   useEffect(() => {
      if (records.length > 0 && yearPeriod.length > 0) {
         const newData = filterPeriodByDates(records, yearPeriod[yearSelected].start, yearPeriod[yearSelected].end);
         setOutputRecords(newData);
         setCategory(getCategoryList(newData));
      }
   }, [records, yearPeriod, yearSelected, filterPeriodByDates, getCategoryList]);


   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 500);
   }, [isLoading]);

   return (
      <div>
         <div className="select-wrapper">
            <select defaultValue={yearSelected} onChange={(e) => {handleSelect(e.target.value)}}>
               {yearList.map((year, index) => 
                  <option value={index} key={index}>{year}</option>
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
                              <td id="amount">{(outputRecords.filter((record) => record.category === category).reduce((sum, record) => sum + record.amount, 0)).toFixed(2)}</td>
                           </tr>)}
                        </>
                     }
                  </tbody>
               </table>
               <p className="total">Total: € {(outputRecords.reduce((sum, record) => sum + record.amount, 0)).toFixed(2)}</p>
               {isLoading && <LoadingIconSmall />}            
            </div>
            : <LoadingIconSmall />
         }
      </div>
   )
}
