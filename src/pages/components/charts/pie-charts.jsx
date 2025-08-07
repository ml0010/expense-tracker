import { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import Pie from './pie';
import "./pie-charts.css";

export const ExpenseChart = () => {
    
    const [ data, setData ] = useState([]);
    const { expenseRecords, getTotal } = useContext(ExpenseRecordContext);

    const getCategoryData = () => {
        const category = [...new Set(expenseRecords.map(record => record.category))];

        const data = [];

        for (let i = 0; i < category.length; i++ ) {
            let sum = 0;
            for (let j = 0; j < expenseRecords.length; j++) {
                if(expenseRecords[j].category === category[i])
                    sum += expenseRecords[j].amount;
            }
            data.push({name: category[i], value: sum * -1});
        }
        return data;
    };

    useEffect((() => {
       setData(getCategoryData());
    }),[expenseRecords]);

    return (
        <>
        {data.length > 0 ? 
            <div className="pie-chart expense">
                <Pie 
                    data={data}
                    width={320}
                    height={320}
                    innerRadius={65}
                    outerRadius={120}
                    total={getTotal(expenseRecords)}
                    name={"expense"}
                />
            </div>
            : <></>
        }</>
    )
}


export const IncomeChart = () => {

    const [ data, setData ] = useState([]);
    const { incomeRecords, getTotal } = useContext(ExpenseRecordContext);

    const getIncomeData = () => {
        const incomeSources = [...new Set(incomeRecords.map(record => record.description))];

        const data = [];

        for (let i = 0; i < incomeSources.length; i++ ) {
            let sum = 0;
            for (let j = 0; j < incomeRecords.length; j++) {
                if(incomeRecords[j].description === incomeSources[i])
                    sum += incomeRecords[j].amount;
            }
            data.push({name: incomeSources[i], value: sum});
        }
        return data;
    };

    useEffect((() => {
       setData(getIncomeData());
    }),[incomeRecords]);

    return (
        <>
        {data.length > 0 ? 
            <div className="pie-chart income">
                <Pie 
                    data={data}
                    width={320}
                    height={320}
                    innerRadius={65}
                    outerRadius={120}
                    total={getTotal(incomeRecords)}
                    name={"income"}
                />
            </div>
            : <></>
        }</>
    )
}

    /*
    const test = [
        {name:"Mark", value: 90},
        {name:"Robert", value: 12},
        {name:"Emily", value: 34},
        {name:"Marion", value: 53},
        {name:"Nicolas", value: 98},
    ];*/
