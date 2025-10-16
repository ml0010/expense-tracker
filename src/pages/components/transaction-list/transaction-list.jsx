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
    const { recordsFiltered, setSearchText } = useContext(TransactionFilterContext);
    
    const [ searchInput, setSearchInput ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ listLength, setListLength ] = useState(10);

    useEffect(() => {
        setLoading(true);
        setListLength(10);
    }, [recordsFiltered]);
    
    setTimeout(() => {
        setLoading(false);
    }, 1500);

    const handleTextSearch = () => {
        console.log("searching: ", searchInput);
        setSearchText(searchInput);
        setSearchInput("");
    };

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

    return (
        <>
        {isRecordLoaded ? 
            <div className="table-warpper">
                <div className="filters">
                    <div className="select-filter">
                        <PeriodFilter />
                        <CategoryFilter />
                    </div>
                    <div className={`search-box`}>
                        <MagnifyingGlassIcon size={18} />
                        <input className="search-input" 
                                value={searchInput} 
                                placeholder="Search" 
                                onChange={(e)=>setSearchInput(e.target.value)} 
                                onKeyDown={(e) => {e.key === 'Enter' && handleTextSearch()}} 
                        />
                        <XIcon className={`close-button ${searchInput.length > 0 ? "active" : ""}`} 
                                onClick={() => setSearchInput("")} 
                                size={13} 
                        />
                    </div>
                </div>
                <div className="filter-lists">
                    <FilterButtons />
                </div>
                <table className="table" ref={searchRef}>
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
                        {loading ? 
                        <tr>
                            <td colSpan="5">
                                <LoadingIconSmall />
                            </td>
                        </tr> : 
                        <>
                            {recordsFiltered.length > 0 ? 
                                <>
                                {recordsFiltered.slice(0, listLength).map((record ,index) => (
                                    <TransactionListElement record={record} key={index}/>
                                ))}
                                {listLength < recordsFiltered.length &&
                                    <tr>
                                        <td className="see-more-button" colSpan="5" onClick={() => setListLength(listLength + 5)}>SEE MORE ({recordsFiltered.length - listLength} more)</td>
                                    </tr>
                                }
                                </> : 
                                <tr>
                                    <td colSpan="5">
                                    <EmptyList />
                                    </td>
                                </tr>
                            }
                        </>
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
            <p>Period</p>
            <div className="date-input">
                <input className="input" value={`${dateFormat(periodList[currentPeriod].start)} to ${dateFormat(periodList[currentPeriod].end)}`} onClick={() => setOpenForm(!openForm)} onChange={() => {}}/>
                <button className={`date-default-button ${currentPeriod !== "all" ? "active" : ""}`} onClick={()=>handlePeriodChange("all")}><XIcon /></button>
            </div>
            <div className={`date-selector ${openForm ? "active" : ""}`}>
                <DateSelector close={()=>setOpenForm(false)}/>
            </div>
        </div>
    )
}
/*

            <input value={`${periodList[currentPeriod].start.toISOString().split('T')[0]} to ${periodList[currentPeriod].end.toISOString().split('T')[0]}`} onClick={() => setOpenForm(!openForm)} onChange={() => {}}/>


            <select defaultValue={currentPeriod} onChange={(e) => handlePeriodChange(e.target.value)}>
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom" onClick={() => setIsCustom(true)}>Custom</option>
            </select>
*/
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
                <button className="button" value={periodSelected} onClick={(e) => {handleSubmit(e.target.value, startDate, endDate)}}>Confirm</button>
                <button className="button" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

const CategoryFilter = () => {

    const { categoryList, addCategoryFilter } = useContext(TransactionFilterContext);
    
    return (
        <div className="filter category-filter">
            {categoryList.length > 1 ?
            <>
                <p>Category</p>
                <select className="input" value="all" onChange={(e) => addCategoryFilter(e.target.value)}>
                    <option value="all">Select</option>
                    {categoryList.map((category, index) => 
                        <option key={index} value={`${category}`}>{category}</option>
                    )}
                </select>
            </>
            : <></>
            }
        </div>
    )
}

const FilterButtons = () => {
    const { currentPeriod, periodList, handlePeriodChange, categoryFilterList, deleteCategoryFilter, deleteAllCategoryFilter, searchText, setSearchText } = useContext(TransactionFilterContext);
    
    const handleDeleteAllFilters = () => {
        deleteAllCategoryFilter();
        handlePeriodChange("all");
        setSearchText(null);
    };

    const start = new Date(new Date(periodList[currentPeriod].start).setDate(new Date(periodList[currentPeriod].start).getDate() + 1));

    //console.log(start);

    return (
        <>
        {currentPeriod !== "all" && 
            <div className="date-buttons">
                <button 
                    className="date-button" 
                    id={currentPeriod} 
                    onClick={() => handlePeriodChange("all")}
                >
                    Date: {currentPeriod === "custom" ?  
                    `${dateFormat(periodList[currentPeriod].start)} ~ ${dateFormat(periodList[currentPeriod].end)}` : 
                    currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1)} <XIcon size={13} 
                />
                </button>
            </div>
        }
        {categoryFilterList.length > 0 &&
            <div className="category-buttons">
                {categoryFilterList.map((category, index) => 
                    <button className="category-button" 
                            key={index} 
                            id={category} 
                            onClick={(e) => deleteCategoryFilter(e.target.id)}
                    >
                        Category: {category} <XIcon size={13} />
                    </button>
                )}
            </div>
        }
        {searchText &&
            <div className="category-buttons">
                <button className="category-button" onClick={() => setSearchText(null)}>Search: {searchText} <XIcon size={13} /></button>
            </div>
        }
        {(currentPeriod !== "all" || categoryFilterList.length > 0 || categoryFilterList.length > 0 || searchText) &&
            <button className="delete-all-button" onClick={handleDeleteAllFilters}>Delete All</button>
        }
        </>
    )
};



    /*
    const getRows = (expense) => {
        if(records) {
            for (const [key, value] of Object.entries(expense)) {
                console.log(`${key}: ${value}`);
            }
        }
    };*/
