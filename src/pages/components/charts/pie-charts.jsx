import { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import Pie from './pie';
import "./pie-charts.css";
import { LoadingIconSmall } from '../loading-icon/loading';

export const ExpensePieChart = () => {

    const [ data, setData ] = useState([]);
    const { isRecordLoaded, expenseRecords, getTotal } = useContext(ExpenseRecordContext);

    const getCategoryData = () => {
        const category = [...new Set(expenseRecords.map(record => record.category))];
        console.log("getCategory");

        const data = [];

        for (let i = 0; i < category.length; i++ ) {
            let sum = 0;
            for (let j = 0; j < expenseRecords.length; j++) {
                if(expenseRecords[j].category === category[i])
                    sum += expenseRecords[j].amount;
            }
            data.push({name: category[i], value: sum * -1});
        }
        console.log(data);
        return data;
    };

    useEffect((() => {
        if (expenseRecords.length > 0)
            setData(getCategoryData());
    }),[expenseRecords]);

    return (
        <>
        {isRecordLoaded ? 
            <div className="pie-chart expense">
                <Pie 
                    data={data}
                    width={320}
                    height={320}
                    total={getTotal(expenseRecords)}
                    name={"expense"}
                />
            </div>
            : <LoadingIconSmall />
        }
        </>
    )
}


export const IncomePieChart = () => {

    const [ data, setData ] = useState([]);
    const { isRecordLoaded, incomeRecords, getTotal } = useContext(ExpenseRecordContext);

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
        if (incomeRecords.length > 0)
            setData(getIncomeData());
    }),[incomeRecords]);

    return (
        <>
        {isRecordLoaded ?
            <div className="pie-chart income">
                <Pie 
                    data={data}
                    width={320}
                    height={320}
                    total={getTotal(incomeRecords)}
                    name={"income"}
                />
            </div>
        : <LoadingIconSmall />
        }
        </>
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
