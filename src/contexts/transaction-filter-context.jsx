import { createContext, useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from './transaction-record-context';

export const TransactionFilterContext = createContext(null);

export const TransactionFilterContextProvider = (props) => {

   const { records, expenseRecords, incomeRecords } = useContext(TransactionRecordContext);

   const dataSelection = props.data;  // income or expense

   const [ currentPeriod, setCurrentPeriod ] = useState(props.period || "all"); // periodList options
   const [ customStartDate, setCustomStartDate ] = useState(null);
   const [ customEndDate, setCustomEndDate ] = useState(null);

   const [ recordsFiltered, setRecordsFiltered ] = useState([]);
   const [ isFilteredRecordsReady, setIsFilteredRecordsReady ] = useState(false);

   const [ categoryList, setCategoryList ] = useState([]);
   const [ categoryFilterList, setCategoryFilterList ] = useState([]);
   const [ searchText, setSearchText ] = useState(null);

   const currentMonth = new Date().getMonth();
   const currentYear = new Date().getFullYear();
   //const MonthsText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const periodList = {
      "today" : {
         start: new Date(new Date().setHours(0, 0, 0, 0)),
         end: new Date(new Date().setHours(23, 59, 59, 0))
      },
      "month" : {
         start: new Date(currentYear, currentMonth, 1),
         end: new Date(currentYear, currentMonth + 1, 0, 23, 59, 59)
      },
      "year" : {
         start: new Date(currentYear, 0, 1),
         end: new Date(currentYear, 12, 0, 23, 59, 59)
      },
      "all" : {
         start: new Date(records.length > 0 ? new Date(Math.min(...records.map((record) => new Date(record.date)))) : 0),
         end: new Date()
      },
      "custom" : {
         start: customStartDate,
         end: customEndDate
      }
   };

   const sortByDate = (records) => {
      setIsFilteredRecordsReady(false);
      return records.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
   };
   const sortByReversedDate = (records) => {
      setIsFilteredRecordsReady(false);
      return records.sort((a, b) => {return new Date(a.date) - new Date(b.date)});
   };
   const sortByAmount = (records) => {
      setIsFilteredRecordsReady(false);
      return records.sort((a, b) => {return b.amount - a.amount});
   };
   const sortByReversedAmount = (records) => {
      setIsFilteredRecordsReady(false);
      return records.sort((a, b) => {return a.amount - b.amount});
   };

   /*
   useEffect(() => {
      console.log("DATA FILETRED");
      setIsFilteredRecordsReady(false);
   }, [recordsFiltered]);
   */

   useEffect(() => {
      if(!isFilteredRecordsReady) {
         setTimeout(() => {
            setIsFilteredRecordsReady(true);
         }, 500);
      }
   }, [isFilteredRecordsReady]);

   useEffect(() => {
      const data = (dataSelection === "income" ? [...incomeRecords] : dataSelection === "expense" ? [...expenseRecords] : [...records]);

      if (data.length > 0 && currentPeriod) {
         //console.log("Period Selected: ", currentPeriod);
         //console.log(periodList[currentPeriod]);
         var newRecords = filterPeriod(data, currentPeriod);

         if (categoryFilterList.length > 0) {
            newRecords = filterCategory(newRecords);
         }
         if (searchText) {
            newRecords = filterText(newRecords);
         } 
         setRecordsFiltered([...newRecords]);
      } 
   }, [records, incomeRecords, expenseRecords, currentPeriod, categoryFilterList, searchText]);

   const filterPeriod = (records, period) => {
      return records.filter((record) => 
         new Date(record.date) >= periodList[period].start && 
         new Date(record.date) <= periodList[period].end);
   };

   const filterPeriodByDates = (records, startDate, endDate) => {
       return records.filter((record) => 
         new Date(record.date) >= startDate && 
         new Date(record.date) <= endDate);
   };

   const filterCategory = (records) => {
      return records.filter((record) => categoryFilterList.includes(record.category));
   };
   const filterText = (records) => {
      return records.filter((record) => (record.description.toLowerCase().includes(searchText.toLocaleLowerCase())));
   };

   const getCategoryList = (records) => {
      return [...new Set(records.map((records) => records.category))];
   };
   const getDescriptionList = (records) => {
      return [...new Set(records.map((records) => records.description))];
   };

   useEffect(() => {
      if (recordsFiltered.length > 0 && categoryFilterList.length === 0) {
         setCategoryList(getCategoryList(recordsFiltered));
      }
   }, [recordsFiltered, categoryFilterList]);

   const handlePeriodChange = (period, start, end) => {
      setCategoryList([]);
      setCategoryFilterList([]);
      setSearchText(null);
      //console.log(start, end);
      if (start && end) {
         setCustomStartDate(new Date(start));
         setCustomEndDate(new Date(end));
         setCurrentPeriod(period);
      } else {
         setCurrentPeriod(period);
      }
   };

   const addCategoryFilter = (category) => {
      if (!categoryFilterList.includes(category) && category !== "all")
         setCategoryFilterList([...categoryFilterList, category]);
   };
   const deleteAllCategoryFilter = () => {
      setCategoryFilterList([]);
   };
   const deleteCategoryFilter = (category) => {
      setCategoryFilterList((prev) => prev.filter(item => item !== category));
   };

   const contextValue = { currentMonth, currentYear, currentPeriod, periodList, recordsFiltered, setRecordsFiltered, handlePeriodChange, categoryList, categoryFilterList, addCategoryFilter, deleteCategoryFilter, deleteAllCategoryFilter, filterPeriod, filterPeriodByDates, getCategoryList, getDescriptionList, searchText, setSearchText, isFilteredRecordsReady, sortByDate, sortByReversedDate, sortByAmount, sortByReversedAmount };

   return (
      <TransactionFilterContext.Provider value={contextValue}>{props.children}</TransactionFilterContext.Provider>
   )
}
