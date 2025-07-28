import React, { useContext, useEffect, useState } from 'react'
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context'
import { CategoryFilter } from './expense-list-category';

export const ExpenseListFilter = () => {
    const { handlePeriodChange } = useContext(ExpenseFilterContext);

    return (
        <div className="filter">
            <div className="period-filter">
                <p>Period</p>
                <select defaultValue="month" onChange={(e) => handlePeriodChange(e.target.value)}>
                    <option value="today">Today</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                    <option value="all">All</option>
                </select>
            </div>
            <CategoryFilter />
        </div>
    )
}
