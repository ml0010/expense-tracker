import React, { useContext, useEffect, useState } from 'react'
import { ExpenseFilterContext } from '../../../contexts/expense-filter-context';

export const CategoryFilter = () => {

    const { categoryList, categoryFilterList, addCategoryFilter, deleteCategoryFilter, deleteAllCategoryFilter } = useContext(ExpenseFilterContext);


    return (
        <div className="category-filter">
            <p>Category</p>
            <select defaultValue="all" onChange={(e) => addCategoryFilter(e.target.value)}>
                <option value="all">Categories</option>
                {categoryList.map((category, index) => 
                    <option key={index} value={`${category}`}>{category}</option>
                )}
            </select>
            {categoryFilterList.length > 0 ?                 
                <div>
                    <button onClick={() => deleteAllCategoryFilter()}>x</button>
                    {categoryFilterList.map((category, index) => <button key={index} id={category} onClick={(e) => deleteCategoryFilter(e.target.id)}>{category}</button>)}
                </div> : <></>
            }
        </div>
    )
}
