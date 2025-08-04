import { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseListElement } from './expense-list-element';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { ExpenseFilterContext } from '../../../../contexts/expense-filter-context';
import { PeriodFilter } from './expense-list-filter-period';
import { CategoryFilter } from './expense-list-filter-category';

export const ExpenseList = () => {

    const { recordsFiltered } = useContext(ExpenseFilterContext);
    
    const [ isSearch, setIsSearch ] = useState(false);
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);

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
        setSearchInput(input);
        const searchResults = recordsFiltered.filter((record) => record.description.toLowerCase().includes(input.toLocaleLowerCase()));
        setSearchResult([...searchResults]);
    };

    useEffect(() => {
        if(searchInput.length < 2) {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
    }, [searchInput]);

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
        <div className="table-warpper">
            <div className="filters">
                <div className="select">
                    <PeriodFilter />
                    <CategoryFilter />
                </div>
                <div className={`search-box ${isSearch? "active" : ""}`}>
                    <MagnifyingGlassIcon size={23} />
                    <input className="search-input" value={searchInput} placeholder="Search" onChange={(e)=>search(e.target.value)} onClick={()=>startSearch()}></input>
                    <XIcon className={`close-button ${isSearch? "active" : ""}`}onClick={() => finishSearch()} size={23} />
                </div>
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
                    {isSearch? <>
                        {searchResult.map((record ,index) => (
                            <ExpenseListElement record={record} key={index}/>
                        ))}
                    </> : <>
                        {recordsFiltered.map((record ,index) => (
                            <ExpenseListElement record={record} key={index}/>
                        ))}
                    </>}
                </tbody>
            </table>
        </div>
    )
}
    /*
    const getRows = (expense) => {
        if(records) {
            for (const [key, value] of Object.entries(expense)) {
                console.log(`${key}: ${value}`);
            }
        }
    };*/
