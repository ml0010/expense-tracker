import React, { createContext, useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from './expense-record-context';

export const ExpenseFilterContext = createContext(null);

export const ExpenseFilterContextProvider = (props) => {

    const { records } = useContext(ExpenseRecordContext);
    const [ currentPeriod, setCurrentPeriod ] = useState("month");
    const [ recordsFiltered, setRecordsFiltered ] = useState([]);

    const today = new Date();
    const month = new Date().getMonth()
    const year = new Date().getFullYear();    


    const periodList = {
        "today" : {
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date().setHours(23, 59, 59, 0)
        },
        "month" : {
            start: new Date(year, month, 1),
            end: new Date(year, month + 1, 0, 23, 59, 59)
        },
        "year" : {
            start: new Date(year, 0, 1),
            end: new Date(year, 12, 0, 23, 59, 59)
        },
        "all" : {
            start: new Date(0),
            end: new Date()
        }
    };
    
    useEffect(() => {
        console.log("getting record list");
        if (records.length > 0 && currentPeriod) {
            const newRecords = records.filter((record) => new Date(record.date) >= periodList[currentPeriod].start && new Date(record.date) <= periodList[currentPeriod].end);
            console.log(newRecords);
            setRecordsFiltered([...newRecords]);
        }
    }, [records, currentPeriod]);


    const handleFilter = (filterType) => {
        setCurrentPeriod(filterType);
    };

    const contextValue = { currentPeriod, recordsFiltered, setRecordsFiltered, handleFilter };

    return (
        <ExpenseFilterContext.Provider value={contextValue}>{props.children}</ExpenseFilterContext.Provider>
    )
}
