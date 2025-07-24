import React, { useContext, useEffect, useState } from 'react'
import Pie from './pie';
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const ExpenseChart = () => {

    const [ data, setData ] = useState([]);
    const { records } = useContext(ExpenseRecordContext);

    const getCategoryData = () => {
        const category = [...new Set(records.map(record => record.category))];
        const incomeIndex = category.indexOf("Income");

        if (incomeIndex > -1)
            category.splice(incomeIndex, 1);

        const data = [];

        for (let i = 0; i < category.length; i++ ) {
            let sum = 0;
            for (let j = 0; j < records.length; j++) {
                if(records[j].category === category[i])
                    sum += records[j].amount;
            }
            data.push({name: category[i], value: sum * -1});
        }
        return data;
    };

    /*
    const test = [
        {name:"Mark", value: 90},
        {name:"Robert", value: 12},
        {name:"Emily", value: 34},
        {name:"Marion", value: 53},
        {name:"Nicolas", value: 98},
    ];*/

    useEffect((() => {
       setData(getCategoryData());
    }),[records]);

    return (
        <div className='pie-chart'>
            <Pie 
                data={data}
                width={320}
                height={320}
                innerRadius={54}
                outerRadius={120}
            />
        </div>
    )
}


export const IncomeChart = () => {

    const [ data, setData ] = useState([]);
    const { records } = useContext(ExpenseRecordContext);

    const getIncomeData = () => {
        const incomeRecords = records.filter(record => record.category === "Income");
        const incomeSources = [...new Set(incomeRecords.map(record => record.description))];

        console.log(incomeSources);


        const data = [];

        for (let i = 0; i < incomeSources.length; i++ ) {
            let sum = 0;
            for (let j = 0; j < incomeRecords.length; j++) {
                if(incomeRecords[j].description === incomeSources[i])
                    sum += incomeRecords[j].amount;
            }
            data.push({name: incomeSources[i], value: sum});
        }
        console.log(data);
        return data;
    };

    useEffect((() => {
       setData(getIncomeData());
    }),[records]);

    return (
        <div className='pie-chart'>
            <Pie 
                data={data}
                width={320}
                height={320}
                innerRadius={54}
                outerRadius={120}
            />
        </div>
    )
}
