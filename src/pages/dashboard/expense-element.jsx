import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';

export const ExpenseElement = ({record, index}) => {

    const [ editField, setEditField ] = useState("");
    const [ newValue, setNewValue ] = useState("");
    const [ date, setDate ] = useState(record.date);
    const [ category, setCategory ] = useState(record.category);
    const [ description, setDescription ] = useState(record.description);
    const [ amount, setAmount ] = useState(record.amount);

    const { deleteRecord, updateRecord } = useContext(ExpenseRecordContext);
    

    const handleEdit = () => {
        if (newValue === "")
            return;

        const newRecord = { 
            [editField] : newValue
        };
        updateRecord(record._id, newRecord);
    };

    const handleOnclick = (key) => {
        setEditField(key);
    };

    const handleChange = (setState, value) => {
        setState(value);
        setNewValue(value);
    };

    const handleDelete = (id) => {
        deleteRecord(id);
    };

    const handleEditSubmit = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
            setNewValue("");
            setEditField("");
        }
    };

    let expenseRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if (expenseRef.current && !expenseRef.current.contains(e.target) && editField !== "") {
                handleEdit();
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
            <td>
                <input 
                    className={`input ${editField === "date" ? "edit" : ""}`} 
                    id="date" value={date} 
                    onChange={(e) => handleChange(setDate, e.target.value)} 
                    onClick={(e) => {handleOnclick(e.target.id)}} 
                    onKeyDown={(e) => {handleEditSubmit(e)}}
                ></input>
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
