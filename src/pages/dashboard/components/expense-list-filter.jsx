import { CategoryFilter } from './expense-list-filter-category';
import { PeriodFilter } from './expense-list-filter-period';

export const ExpenseListFilter = () => {

    return (
        <div className="filters">
            <PeriodFilter />
            <CategoryFilter />
        </div>
    )
}
