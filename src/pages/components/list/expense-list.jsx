import { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseListElement } from './expense-list-element';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context';
import { EmptyList } from '../empty-list/empty-list'
import "./expense-list.css";
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import { LoadingIconSmall } from '../loading-icon/loading';

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
                        <PeriodFilter />
                        <CategoryFilter />
                    </div>
                    <div className={`search-box ${isSearch? "active" : ""}`}>
                        <MagnifyingGlassIcon size={18} />
                        <input className="search-input" value={searchInput} placeholder="Search" onChange={(e)=>search(e.target.value)} onClick={()=>startSearch()}></input>
                        <XIcon className={`close-button ${isSearch? "active" : ""}`} onClick={() => finishSearch()} size={13} />
                    </div>
                </div>
                <div className="category-buttons">
                    <CategoryButtons />
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

    const { currentPeriod, handlePeriodChange } = useContext(ExpenseFilterContext);

    return (
        <div className="filter period-filter">
            <select defaultValue={currentPeriod} onChange={(e) => handlePeriodChange(e.target.value)}>
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
            </select>
        </div>
    )
}

export const CategoryFilter = () => {

    const { categoryList, addCategoryFilter } = useContext(ExpenseFilterContext);
    
    return (
        <div className="filter category-filter">
            {categoryList.length > 1 ?
            <select value="all" onChange={(e) => addCategoryFilter(e.target.value)}>
                <option value="all">Categories</option>
                {categoryList.map((category, index) => 
                    <option key={index} value={`${category}`}>{category}</option>
                )}
            </select>
            : <></>
            }
        </div>
    )
}

const CategoryButtons = () => {
    const { categoryFilterList, deleteCategoryFilter, deleteAllCategoryFilter } = useContext(ExpenseFilterContext);
    
    return (
        <>
        {categoryFilterList.length > 0 ? 
            <div className="category-buttons">
                {categoryFilterList.map((category, index) => 
                    <button className="category-button" key={index} id={category} onClick={(e) => deleteCategoryFilter(e.target.id)}>{category} <XIcon size={13} /></button>
                )}
                <button className="delete-all-button" onClick={() => deleteAllCategoryFilter()}>Delete All</button>
            </div> : <></> 
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
