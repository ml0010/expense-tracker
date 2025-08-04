import React, { createContext, useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from './expense-record-context';

export const ExpenseFilterContext = createContext(null);

export const ExpenseFilterContextProvider = (props) => {

    const { records, expenseRecords, incomeRecords } = useContext(ExpenseRecordContext);

    const [ dataSelection, setDataSelection ] = useState(props.data);
    const [ currentPeriod, setCurrentPeriod ] = useState("all");
    const [ recordsFiltered, setRecordsFiltered ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ categoryFilterList, setCategoryFilterList ] = useState([]);

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
        const data = (dataSelection === "income" ? [...incomeRecords] : dataSelection === "expense" ? [...expenseRecords] : [...records]);

        if (data.length > 0 && currentPeriod) {
            //console.log("getting record list");
            //console.log(data);
            const newRecords = filterPeriod(data, currentPeriod);

            if (categoryFilterList.length > 0) {
                const categoryFiltered = filterCategory(newRecords);
                setRecordsFiltered([...categoryFiltered]);
                return;
            }
            setRecordsFiltered([...newRecords]);
        }
    }, [records, incomeRecords, expenseRecords, currentPeriod, categoryFilterList]);

    const filterPeriod = (records, period) => {
        return records.filter((record) => 
            new Date(record.date) >= periodList[period].start && 
            new Date(record.date) <= periodList[period].end);
    };

    const filterCategory = (records) => {
        return records.filter((record) => categoryFilterList.includes(record.category));
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
    }, [recordsFiltered]);

    const handlePeriodChange = (period) => {
        setCategoryList([]);
        setCategoryFilterList([]);
        setCurrentPeriod(period);
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

    const contextValue = { currentPeriod, recordsFiltered, setRecordsFiltered, handlePeriodChange, categoryList, categoryFilterList, addCategoryFilter, deleteCategoryFilter, deleteAllCategoryFilter, filterPeriod, getCategoryList, getDescriptionList};

    return (
        <ExpenseFilterContext.Provider value={contextValue}>{props.children}</ExpenseFilterContext.Provider>
    )
}
