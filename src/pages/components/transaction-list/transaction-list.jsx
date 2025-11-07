import { useContext, useEffect, useRef, useState } from 'react'
import { TransactionListElement } from './transaction-list-element';
import { CaretDownIcon, CaretUpIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
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
      setTimeout(() => {
         setIsLoading(false);
      }, 300);
   }, [isLoading]);

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
            <div className="table">
               {recordsFiltered.length > 0 ? 
                  <>
                  {recordsFiltered.slice(0, listLength).map((record ,index) => (
                     <TransactionListElement record={record} key={index}/>
                  ))}
                  {listLength < recordsFiltered.length &&
                     <div className="see-more-button" onClick={handleClickSeeMoreButton}>
                        SEE MORE ({recordsFiltered.length - listLength} more)
                        {isListExtended && <LoadingIconSmall />}
                     </div>
                  }
                  </> : 
                  <EmptyList />
               }
               {isLoading && <LoadingIconSmall />}
            </div>
         </div>
         : <LoadingIconSmall />
      }
      </>
   )
}

export const TransactionListTableHead = () => {
   const { recordsFiltered, setRecordsFiltered, sortByDate, sortByReversedDate, sortByAmount, sortByReversedAmount } = useContext(TransactionFilterContext);
   const [ isDateReverse, setIsDateReverse ] = useState(false);
   const [ isAmountReverse, setIsAmountReverse ] = useState(false);

   const handleClickDateSort = () => {
      setIsDateReverse(!isDateReverse);
      if(isDateReverse) {
         setRecordsFiltered(sortByDate(recordsFiltered));
      } else {
         setRecordsFiltered(sortByReversedDate(recordsFiltered));
      }
   };
   const handleClickAmountSort = () => {
      setIsAmountReverse(!isAmountReverse);
      if(isAmountReverse) {
         setRecordsFiltered(sortByAmount(recordsFiltered));
      } else {
         setRecordsFiltered(sortByReversedAmount(recordsFiltered));
      }
   };

   return (
      <div className="title line">
         <div className="date-th sortable" onClick={handleClickDateSort}>
            <span className="text">Date</span>
            {isDateReverse ? <CaretUpIcon size={12} weight="fill" /> : <CaretDownIcon size={12} weight="fill" />}
         </div>
         <div>Category</div>
         <div>Description</div>
         <div className="amount-th sortable" onClick={handleClickAmountSort}>
            <span className="text">Amount</span>
            {isAmountReverse ? <CaretUpIcon size={12} weight="fill" /> : <CaretDownIcon size={12} weight="fill" />}
         </div>
         <div></div>
      </div>
   );
};

export const TransactionListFilters = () => {
   return (
      <>
         <div className="filters">
            <PeriodFilter />
            <CategoryFilter />
            <TextFilter />
         </div>
         <div className="active-filter-list">
            <FilterButtons />
         </div>
      </>
   );
};

const dateFormat = (date) => {
   const y = date.getFullYear();
   const m = date.getMonth() + 1;
   const d = date.getDate();
   const string = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`
   return string;
};

const PeriodFilter = () => {

   const { currentPeriod, periodList } = useContext(TransactionFilterContext);

   const [ openForm, setOpenForm ] = useState(false);

   return (
      <div className="filter period-filter">
         <span className="filter-title">Period</span>
         <input 
            className="input" 
            value={`${dateFormat(periodList[currentPeriod].start)} to ${dateFormat(periodList[currentPeriod].end)}`} 
            onClick={() => setOpenForm(!openForm)} 
            readOnly
         />
         <div className={`date-selector ${openForm ? "active" : ""}`}>
            <DateSelector close={()=>setOpenForm(false)}/>
         </div>

      </div>
   )
}

const DateSelector = (props) => {

   const { periodList, handlePeriodChange } = useContext(TransactionFilterContext);

   const today = new Date();

   const [ periodSelected, setPeriodSelected ] = useState(null);
   const [ startDate, setStartDate ] = useState(null);
   const [ endDate, setEndDate ] = useState(null);

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
      <>
         <div className="background"></div>
         <div className="date-filter-wrapper">
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
               <button 
                  className="button" 
                  value={periodSelected} 
                  onClick={(e) => {handleSubmit(e.target.value, startDate, endDate)}}
               >
                  Confirm
               </button>
               <span className="close-button" onClick={handleClose}>
                  <XIcon size={15} />
               </span>
            </div>
         </div>
      </>
   )
}

const CategoryFilter = () => {
   const { categoryList, addCategoryFilter } = useContext(TransactionFilterContext);
   
   return (
      <div className="filter category-filter">
         {categoryList.length > 1 && <>
            <span className="filter-title">Category</span>
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
      <div className={`filter search-box ${searchInput.length > 0 ? "active" : ""}`} ref={searchRef}>
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
            size={15} 
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
