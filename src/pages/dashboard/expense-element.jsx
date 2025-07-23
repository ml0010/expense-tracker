import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import DatePicker from 'react-datepicker';

export const ExpenseElement = ({record, index}) => {

    const [ editField, setEditField ] = useState("");
    const [ newValue, setNewValue ] = useState("");
    const [ date, setDate ] = useState(new Date(record.date));
    const [ category, setCategory ] = useState(record.category);
    const [ description, setDescription ] = useState(record.description);
    const [ amount, setAmount ] = useState(record.amount);

    const { deleteRecord, updateRecord } = useContext(ExpenseRecordContext);
    

    const handleEdit = (key, value) => {
        if (value === "") {
            return;
        }

        const newRecord = { 
            [key] : value
        };
        console.log(newRecord);
        updateRecord(record._id, newRecord);
    };

    const handleOnclick = (key) => {
        setEditField(key);
    };

    const handleChange = (setState, value) => {
        setState(value);
        setNewValue(value);
    };

    const handleDateChange = (date) => {
        handleEdit(editField, date);
        setNewValue("");
        setEditField("");
    };

    const handleDelete = (id) => {
        deleteRecord(id);
    };

    const handleEditSubmit = (e) => {
        if (e.key === 'Enter') {
            handleEdit(editField, newValue);
            setNewValue("");
            setEditField("");
        }
    };

    let expenseRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if (expenseRef.current && !expenseRef.current.contains(e.target) && editField !== "") {
                handleEdit(editField, newValue);
                setNewValue("");
                setEditField("");
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <tr key={index} id={record._id} className="expense-element" ref={expenseRef}>
            <td onClick={() => {handleOnclick("date")}}>
                <DatePicker 
                    className={`input ${editField === "date" ? "edit" : ""}`}
                    id="date" 
                    selected={date} 
                    dateFormat="yyyy-MM-dd" 
                    onChange={(newDate) => {
                        setDate(new Date(newDate));
                        handleDateChange(newDate);
                    }}
                />
            </td>
            <td>
                <input 
                    className={`input ${editField === "category" ? "edit" : ""}`} 
                    id="category" 
                    value={category} 
                    onChange={(e) => handleChange(setCategory, e.target.value)} 
                    onClick={(e) => {handleOnclick(e.target.id)}} 
                    onKeyDown={(e) => {handleEditSubmit(e)}}
                ></input>
            </td>
            <td>
                <input 
                    className={`input ${editField === "description"  ? "edit" : ""}`} 
                    id="description" 
                    value={description} 
                    onChange={(e) => handleChange(setDescription, e.target.value)} 
                    onClick={(e) => {handleOnclick(e.target.id)}}
                    onKeyDown={(e) => {handleEditSubmit(e)}}
                ></input>
            </td>
            <td>
                € 
                <input 
                    className={`input ${editField === "amount"  ? "edit" : ""}`} 
                    id="amount" value={amount}
                    onChange={(e) => handleChange(setAmount, e.target.value)} 
                    onClick={(e) => {handleOnclick(e.target.id)}}
                    onKeyDown={(e) => {handleEditSubmit(e)}}
                ></input>
            </td>
            <td>
                <button onClick={(e) => handleDelete(e.target.parentElement.parentElement.id)}>DELETE</button>
            </td>
        </tr>
    )
}
