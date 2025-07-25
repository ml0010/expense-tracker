import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context'
import { ExpenseListElement } from './expense-list-element';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';

export const ExpsnseList = () => {

    const [ isSearch, setIsSearch ] = useState(false);
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);

    const { records } = useContext(ExpenseRecordContext);

    /*
    const getRows = (expense) => {
        if(records) {
            for (const [key, value] of Object.entries(expense)) {
                console.log(`${key}: ${value}`);
            }
        }
    };*/

    const startSearch = () => {
        setIsSearch(true);
        setSearchResult([...records]);
    };
    const finishSearch = () => {
        setIsSearch(false);
        setSearchInput("");
        setSearchResult([]);
    };
    const search = (input) => {
        setSearchInput(input);
        const filterdRecords = records.filter((record) => record.description.toLowerCase().includes(input.toLocaleLowerCase()));
        setSearchResult([...filterdRecords]);
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
        <div className="expense-table-warpper">
            <div className={`search-box ${isSearch? "active" : ""}`}>
                <MagnifyingGlassIcon size={23} />
                <input className="search-input" value={searchInput} placeholder="Search" onChange={(e)=>search(e.target.value)} onClick={()=>startSearch()}></input>
                <XIcon className={`close-button ${isSearch? "active" : ""}`}onClick={() => finishSearch()} size={23} />
            </div>
            <table className="expense-table" ref={searchRef}>
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
                        {records.map((record ,index) => (
                            <ExpenseListElement record={record} key={index}/>
                        ))}
                    </>}
                </tbody>
            </table>
        </div>
    )
}
