import { useContext } from 'react'
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context';
import { XIcon } from '@phosphor-icons/react';

export const CategoryFilter = () => {

    const { categoryList, categoryFilterList, addCategoryFilter, deleteCategoryFilter, deleteAllCategoryFilter } = useContext(ExpenseFilterContext);


    return (
        <div className="category-filter">
            <select value="all" onChange={(e) => addCategoryFilter(e.target.value)}>
                <option value="all">Categories</option>
                {categoryList.map((category, index) => 
                    <option key={index} value={`${category}`}>{category}</option>
                )}
            </select>
                {categoryFilterList.length > 0 ? 
                    <div className="category-buttons">
                        <button className="delete-button" onClick={() => deleteAllCategoryFilter()}>Delete All <XIcon size={13} /></button>
                        {categoryFilterList.map((category, index) => <button className="category-button" key={index} id={category} onClick={(e) => deleteCategoryFilter(e.target.id)}>{category} <XIcon size={13} /></button>)}
                    </div> : <></> 
                }
        </div>
    )
}
