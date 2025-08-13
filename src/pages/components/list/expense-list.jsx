import { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseListElement } from './expense-list-element';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context';
import { EmptyList } from '../empty-list/empty-list'
import "./expense-list.css";
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import { LoadingIconSmall } from '../loading-icon/loading';
import DatePicker from 'react-datepicker';

export const ExpenseList = () => {

    const { isRecordLoaded } = useContext(ExpenseRecordContext);
    const { recordsFiltered } = useContext(ExpenseFilterContext);
    
    const [ isSearch, setIsSearch ] = useState(false);
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1500);

    const startSearch = () => {
        setIsSearch(true);
        setSearchResult([...recordsFiltered]);
    };
    const finishSearch = () => {
        setIsSearch(false);
        setSearchInput("");
        setSearchResult([]);
    };
    const search = (input) => {
        setLoading(true);
        setSearchInput(input);
        const searchResults = recordsFiltered.filter((record) => (record.description.toLowerCase().includes(input.toLocaleLowerCase()) || record.category.toLowerCase().includes(input.toLocaleLowerCase())));
        setSearchResult([...searchResults]);
    };

    let searchRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if(searchRef.current && !searchRef.current.contains(e.target)){
                finishSearch();
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
                    <div className="select-filter" onChange={() => setLoading(true)}>
                        <PeriodFilter loading={setLoading}/>
                        <CategoryFilter />
                    </div>
                    <div className={`search-box ${isSearch? "active" : ""}`}>
                        <MagnifyingGlassIcon size={18} />
                        <input className="search-input" value={searchInput} placeholder="Search" onChange={(e)=>search(e.target.value)} onClick={()=>startSearch()}></input>
                        <XIcon className={`close-button ${isSearch? "active" : ""}`} onClick={() => finishSearch()} size={13} />
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
                        <tr><td colSpan="5">
                            <LoadingIconSmall />
                        </td></tr> : 
                        <>
                        {isSearch ? 
                            <>
                            {searchResult.length > 0 ? 
                                <>
                                {searchResult.map((record ,index) => (
                                    <ExpenseListElement record={record} key={index}/>
                                ))}
                                </> : 
                                <tr>
                                    <td colSpan="5">
                                    <EmptyList />
                                    </td>
                                </tr>
                            }
                            </> : 
                            <>
                            {recordsFiltered.length > 0 ? 
                                <>
                                {recordsFiltered.map((record ,index) => (
                                    <ExpenseListElement record={record} key={index}/>
                                ))}
                                </> : 
                                <tr>
                                    <td colSpan="5">
                                    <EmptyList />
                                    </td>
                                </tr>
                            }
                            </>
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


export const PeriodFilter = () => {

    const { currentPeriod, periodList, handlePeriodChange} = useContext(ExpenseFilterContext);

    const [ openForm, setOpenForm ] = useState(false);

    return (
        <div className="filter period-filter">
            <p>Period</p>
            <div className="input">
                <input value={`${periodList[currentPeriod].start.toISOString().split('T')[0]} to ${periodList[currentPeriod].end.toISOString().split('T')[0]}`} onClick={() => setOpenForm(!openForm)} onChange={() => {}}/>
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
export const DateSelector = (props) => {

    const { periodList, handlePeriodChange } = useContext(ExpenseFilterContext);

    const today = new Date();

    const [periodSelected, setPeriodSelected] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        console.log(dates);
        const [start, end] = dates;
        setPeriodSelected("custom");
        setStartDate(start);
        setEndDate(end);
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

export const CategoryFilter = () => {

    const { categoryList, addCategoryFilter } = useContext(ExpenseFilterContext);
    
    return (
        <div className="filter category-filter">
            {categoryList.length > 1 ?
            <>
                <p>Category</p>
                <select value="all" onChange={(e) => addCategoryFilter(e.target.value)}>
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
    const { currentPeriod, periodList, handlePeriodChange, categoryFilterList, deleteCategoryFilter, deleteAllCategoryFilter } = useContext(ExpenseFilterContext);

    const handleDeleteAllFilters = () => {
        deleteAllCategoryFilter();
        handlePeriodChange("all");
    };

    return (
        <>
        {currentPeriod !== "all" && 
            <div className="date-buttons">
                <button 
                    className="date-button" 
                    id={currentPeriod} 
                    onClick={() => 
                        handlePeriodChange("all")}>Date: {currentPeriod === "custom" ?  
                        `${periodList[currentPeriod].start.toISOString().split('T')[0]} ~ ${periodList[currentPeriod].end.toISOString().split('T')[0]}` : 
                        currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1)} <XIcon size={13} 
                />
                </button>
            </div>
        }
        {categoryFilterList.length > 0 &&
            <div className="category-buttons">
                {categoryFilterList.map((category, index) => 
                    <button className="category-button" key={index} id={category} onClick={(e) => deleteCategoryFilter(e.target.id)}>Category: {category} <XIcon size={13} /></button>
                )}
                <button className="delete-all-button" onClick={handleDeleteAllFilters}>Delete All</button>
            </div>
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
