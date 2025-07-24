import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const BarChart = () => {

    const [ data, setData ] = useState([]);
    const { records } = useContext(ExpenseRecordContext);

    const today = new Date();
    console.log(today);


    return (
        <div>B</div>
    )
}
