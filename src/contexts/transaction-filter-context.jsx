import { createContext, useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from './transaction-record-context';

export const TransactionFilterContext = createContext(null);

export const TransactionFilterContextProvider = (props) => {

    const { records, expenseRecords, incomeRecords } = useContext(TransactionRecordContext);

    const [ dataSelection, setDataSelection ] = useState(props.data);  // income or expense
    const [ currentPeriod, setCurrentPeriod ] = useState(props.period || "all"); // periodList options
    const [ customStartDate, setCustomStartDate ] = useState(null);
    const [ customEndDate, setCustomEndDate ] = useState(null);
    const [ recordsFiltered, setRecordsFiltered ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ categoryFilterList, setCategoryFilterList ] = useState([]);

    const [ month, setMonth ] = useState(new Date().getMonth());
    const [ year, setYear ] = useState(new Date().getFullYear());

    const periodList = {
        "today" : {
            start: new Date(new Date().setHours(0, 0, 0, 0)),
            end: new Date(new Date().setHours(23, 59, 59, 0))
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
            start: new Date(records.length > 0 ? records[records.length-1].date : 0),
            end: new Date()
        },
        "custom" : {
            start: customStartDate,
            end: customEndDate     
        }
    };
    
    useEffect(() => {
        const data = (dataSelection === "income" ? [...incomeRecords] : dataSelection === "expense" ? [...expenseRecords] : [...records]);

        if (data.length > 0 && currentPeriod) {
            //console.log("getting record list");
            console.log("Period Selected: ", currentPeriod);
            //console.log(periodList[currentPeriod]);
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
    }, [recordsFiltered, categoryFilterList]);

    const handlePeriodChange = (period, start, end) => {
        setCategoryList([]);
        setCategoryFilterList([]);
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

    const contextValue = { currentPeriod, periodList, recordsFiltered, setRecordsFiltered, handlePeriodChange, categoryList, categoryFilterList, addCategoryFilter, deleteCategoryFilter, deleteAllCategoryFilter, filterPeriod, getCategoryList, getDescriptionList };

    return (
        <TransactionFilterContext.Provider value={contextValue}>{props.children}</TransactionFilterContext.Provider>
    )
}
