import { useContext, useEffect, useRef, useState } from 'react'
import { TransactionListElement } from './transaction-list-element';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { TransactionFilterContext } from '../../../contexts/transaction-filter-context';
import { EmptyList } from '../empty-list/empty-list'
import "./transaction-list.css";
import { TransactionRecordContext } from '../../../contexts/transaction-record-context';
import { LoadingIconSmall } from '../loading-icon/loading';
import DatePicker from 'react-datepicker';

export const TransactionList = () => {

   const { isRecordLoaded } = useContext(TransactionRecordContext);
   const { recordsFiltered } = useContext(TransactionFilterContext);
   
   const [ isLoading, setIsLoading ] = useState(true);
   const [ listLength, setListLength ] = useState(10);
   const [ isListExtended, setIsListExtended ] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      setListLength(10);
   }, [recordsFiltered]);
   
   setTimeout(() => {
      setIsLoading(false);
   }, 300);

   const handleClickSeeMoreButton = () => {
      setIsListExtended(true);
      setTimeout(() => {
         setIsListExtended(false);
         setListLength(listLength + 5);
      }, 500);
   };

   return (
      <>
      {isRecordLoaded ? 
         <div className="table-warpper">
            <div className="filters">
               <PeriodFilter />
               <CategoryFilter />
               <TextFilter />
            </div>
            <div className="active-filter-list">
               <FilterButtons />
            </div>
            <table className="table">
               <thead>
                  <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                  </tr>
               </thead>
               <tbody>
                  {recordsFiltered.length > 0 ? 
                     <>
                     {recordsFiltered.slice(0, listLength).map((record ,index) => (
                        <TransactionListElement record={record} key={index}/>
                     ))}
                     {listLength < recordsFiltered.length &&
                        <tr>
                           <td className="see-more-button" colSpan="5" onClick={handleClickSeeMoreButton}>
                                 SEE MORE ({recordsFiltered.length - listLength} more)
                                 {isListExtended && <LoadingIconSmall />}
                           </td>
                        </tr>
                     }
                     </> : 
                     <tr>
                        <td colSpan="5">
                        <EmptyList />
                        </td>
                     </tr>
                  }
                  {isLoading && 
                     <tr>
                        <td colSpan="5">
                           <LoadingIconSmall />
                        </td>
                     </tr>                       
                  }
               </tbody>
            </table>
         </div>
         : <LoadingIconSmall />
      }
      </>
   )
}

const dateFormat = (date) => {
   const y = date.getFullYear();
   const m = date.getMonth() + 1;
   const d = date.getDate();
   const string = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`
   return string;
};

const PeriodFilter = () => {

   const { currentPeriod, periodList, handlePeriodChange} = useContext(TransactionFilterContext);

   const [ openForm, setOpenForm ] = useState(false);

   return (
      <div className="filter period-filter">
         <span className="name">Period</span>
         <div className="date-input">
               <input 
                  className="input" 
                  value={`${dateFormat(periodList[currentPeriod].start)} to ${dateFormat(periodList[currentPeriod].end)}`} 
                  onClick={() => setOpenForm(!openForm)} 
                  readOnly
               />
               <button 
                  className={`date-default-button ${currentPeriod !== "all" ? "active" : ""}`} 
                  onClick={()=>handlePeriodChange("all")}
               >
                  <XIcon size={13}/>
               </button>
         </div>
         <div className={`date-selector ${openForm ? "active" : ""}`}>
               <DateSelector close={()=>setOpenForm(false)}/>
         </div>
      </div>
   )
}

const DateSelector = (props) => {

   const { periodList, handlePeriodChange } = useContext(TransactionFilterContext);

   const today = new Date();

   const [periodSelected, setPeriodSelected] = useState(null);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);

   const onChange = (dates) => {
      //console.log(dates);
      const [start, end] = dates;
      setPeriodSelected("custom");
      setStartDate(setMinHour(start));
      setEndDate(setMaxHour(end));
   };
   const setMaxHour = (date) => {
      if(date)
         return new Date(new Date(date).setHours(23, 59, 59, 0));
   };
   const setMinHour = (date) => {
      if(date)
         return new Date(new Date(date).setHours(0, 0, 0, 0));
   };

   const handleClose = () => {
      setStartDate(null);
      setEndDate(null);
      props.close();
   };

   const handleClickOptions = (period) => {
      const start = periodList[period].start;
      const end = periodList[period].end;
      setPeriodSelected(period);
      setStartDate(start);
      setEndDate(end);
   };

   const handleSubmit = (period, start, end) => {
      handlePeriodChange(period, start, end);
      handleClose();
   };

   let formRef = useRef(null);

   useEffect(() => {
      let handler = (e)=>{
         if(formRef.current && !formRef.current.contains(e.target)){
               handleClose();
         }
      };
      document.addEventListener("mousedown", handler);
      return() =>{
         document.removeEventListener("mousedown", handler);
      }
   }, [formRef]);

   return (
      <div className="date-filter" ref={formRef}>
         <h3>Date Selector</h3>
         <div className="date-filter-buttons" >
            <button className="option" value="all" onClick={(e) => handleClickOptions(e.target.value)}>All</button>
            <button className="option" value="today" onClick={(e) => handleClickOptions(e.target.value)}>Today</button>
            <button className="option" value="month" onClick={(e) => handleClickOptions(e.target.value)}>This Month</button>
            <button className="option" value="year" onClick={(e) => handleClickOptions(e.target.value)}>This Year</button>
         </div>
         <div className="date-picker">
            <DatePicker 
               selected={startDate}
               onChange={onChange}
               startDate={startDate}
               endDate={endDate}
               maxDate={today}
               selectsRange
               rangeSeparator=" - "
               isClearable={true}
            />
         </div>
         <div>
            <button 
               className="button" 
               value={periodSelected} 
               onClick={(e) => {handleSubmit(e.target.value, startDate, endDate)}}
            >
               Confirm
            </button>
            <button className="button" onClick={handleClose}>Close</button>
         </div>
      </div>
   )
}

const CategoryFilter = () => {
   const { categoryList, addCategoryFilter } = useContext(TransactionFilterContext);
   
   return (
      <div className="filter category-filter">
         {categoryList.length > 1 && <>
            <span className="name">Category</span>
            <select className="input" value="all" onChange={(e) => addCategoryFilter(e.target.value)}>
               <option value="all">Select</option>
               {categoryList.map((category, index) => 
                  <option key={index} value={`${category}`}>{category}</option>
               )}
            </select>
         </>}
      </div>
   )
}

const TextFilter = () => {

   const { setSearchText } = useContext(TransactionFilterContext);

   const [ searchInput, setSearchInput ] = useState("");

   let searchRef = useRef(null);

   useEffect(() => {
      let handler = (e)=>{
         if(searchRef.current && !searchRef.current.contains(e.target)){
               setSearchInput("");
         }
      };
      document.addEventListener("mousedown", handler);
      return() =>{
         document.removeEventListener("mousedown", handler);
      }
   }, [searchRef]);

   const handleTextSearch = () => {
      console.log("searching: ", searchInput);
      setSearchText(searchInput);
      setSearchInput("");
   };

   return (
      <div className={`search-box ${searchInput.length > 0 ? "active" : ""}`} ref={searchRef}>
         <MagnifyingGlassIcon size={18} />
         <input 
               className="search-input" 
               value={searchInput} 
               placeholder="Search" 
               onChange={(e)=>setSearchInput(e.target.value)} 
               onKeyDown={(e) => {e.key === 'Enter' && handleTextSearch()}} 
         />
         <XIcon 
               className={"close-button"} 
               onClick={() => setSearchInput("")} 
               size={13} 
         />
      </div>
   );
};

const FilterButtons = () => {
   const { currentPeriod, periodList, handlePeriodChange, categoryFilterList, deleteCategoryFilter, deleteAllCategoryFilter, searchText, setSearchText } = useContext(TransactionFilterContext);
   
   const handleDeleteAllFilters = () => {
      deleteAllCategoryFilter();
      handlePeriodChange("all");
      setSearchText(null);
   };

   //const start = new Date(new Date(periodList[currentPeriod].start).setDate(new Date(periodList[currentPeriod].start).getDate() + 1));
   //console.log(start);

   return (
      <div className="filter-buttons">
         {currentPeriod !== "all" && 
               <button 
                  className="filter-button date-button" 
                  id={currentPeriod} 
                  onClick={() => handlePeriodChange("all")}
               >
                  Date: {currentPeriod === "custom" ?  
                  `${dateFormat(periodList[currentPeriod].start)} ~ ${dateFormat(periodList[currentPeriod].end)}` : 
                  currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1)} <XIcon size={13} 
               />
               </button>
         }
         {categoryFilterList.length > 0 &&
               (categoryFilterList.map((category, index) => 
                  <button className="filter-button category-button" 
                           key={index} 
                           id={category} 
                           onClick={(e) => deleteCategoryFilter(e.target.id)}
                  >
                     Category: {category} <XIcon size={13} />
                  </button>
               ))
         }
         {searchText &&
               <button className="filter-button text-search-button" onClick={() => setSearchText(null)}>Search: {searchText} <XIcon size={13} /></button>
         }
         {(currentPeriod !== "all" || categoryFilterList.length > 0 || categoryFilterList.length > 0 || searchText) &&
               <button className="delete-all-button" onClick={handleDeleteAllFilters}>Delete All</button>
         }
      </div>
   )
};
