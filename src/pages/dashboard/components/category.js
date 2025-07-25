import React from 'react'
import { CategoryList } from './category-list'

export const Category = () => {
  return (
    <>
        {CategoryList.map((category, index) => 
            <option key={index} value={`${category}`}>{category}</option>
        )}
    </>
  )
}
