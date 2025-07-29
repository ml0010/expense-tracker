import { useContext } from 'react'
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context';

export const PeriodFilter = () => {

    const { handlePeriodChange } = useContext(ExpenseFilterContext);

    return (
        <div className="period-filter">
            <select defaultValue="all" onChange={(e) => handlePeriodChange(e.target.value)}>
                <option value="today">Today</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all">All</option>
            </select>
        </div>
    )
}
