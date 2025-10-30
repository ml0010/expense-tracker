import { useContext, useEffect, useState } from "react"
import { TransactionFilterContext } from "../../../contexts/transaction-filter-context";
import { TransactionRecordContext } from "../../../contexts/transaction-record-context";
import { LoadingIconSmall } from "../../components/loading-icon/loading";

export const ExpenseYearly = () => {
   const { isRecordLoaded, expenseRecords } = useContext(TransactionRecordContext);
   const { currentYear, filterPeriodByDates, getCategoryList } = useContext(TransactionFilterContext);

   const getLastFewYears = () => {
      const results = [];
      const numberOfYears = 3;
      for (let i = 0; i < numberOfYears; i++) {
         const newYear = currentYear - i;
         results.push(newYear);
      }
      return results;
   };
   
   const [ isLoading, setIsLoading ] = useState(true);
   const [ records, setRecords ] = useState([]);
   const [ category, setCategory ] = useState(getCategoryList(records));
   const [ yearList, setYearList ] = useState(getLastFewYears());
   const [ yearPeriod, setYearPeriod ] = useState([]);
   const [ yearSelected, setYearSelected ] = useState(0);

   const handleSelect = (value) => {
      setYearSelected(value);
      setIsLoading(true);
   };

   useEffect(() => {
      const year = [];
      yearList.map((item) => year.push({
         "start" : new Date(item, 0, 1),
         "end": new Date(item, 12, 0, 23, 59, 59)
      }));
      setYearPeriod(year);
   }, [yearList]);

   useEffect(() => {
      if (expenseRecords.length > 0 && yearPeriod.length > 0) {
         const newData = filterPeriodByDates(expenseRecords, yearPeriod[yearSelected].start, yearPeriod[yearSelected].end);
         setRecords(newData);
         setCategory(getCategoryList(newData));
      }
   }, [expenseRecords, yearPeriod, yearSelected]);


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
