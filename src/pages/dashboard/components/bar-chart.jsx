import React, { useContext } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';

export const BarChart = () => {

    const [ data, setData ] = useState([]);
    const { records } = useContext(ExpenseRecordContext);



    return (
        <div>B</div>
    )
}
