import React, { useContext, useEffect, useId } from 'react'
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const ExpenseListFilter = () => {
    const { records } = useContext(ExpenseRecordContext);
    const { currentPeriod, recordsFiltered, setRecordsFiltered, handleFilter} = useContext(ExpenseFilterContext);


    return (
        <div className="filter">
            <div className="period-filter">
                <select defaultValue={"month"} onChange={(e) => handleFilter(e.target.value)}>
                    <option value="today">Today</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                    <option value="all">All</option>
                </select>
            </div>
        </div>
    )
}

    /*


.expense-table-warpper .filter {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

    */