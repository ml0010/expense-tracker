import { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import Pie from './pie';

export const ExpenseChart = () => {
    
    const [ data, setData ] = useState([]);
    const { records , expenseTotal } = useContext(ExpenseRecordContext);

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

    useEffect((() => {
       setData(getCategoryData());
    }),[records]);

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
                    total={expenseTotal}
                    name={"expense"}
                />
            </div>
            : <></>
        }</>
    )
}


export const IncomeChart = () => {

    const [ data, setData ] = useState([]);
    const { records, incomeTotal } = useContext(ExpenseRecordContext);

    const getIncomeData = () => {
        const incomeRecords = records.filter(record => record.category === "Income");
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
    }),[records]);

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
                    total={incomeTotal}
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
