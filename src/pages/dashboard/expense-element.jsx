import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';

export const ExpenseElement = ({record, index}) => {

    const [ editField, setEditField ] = useState("");
    const [ date, setDate ] = useState(record.date);
    const [ category, setCategory ] = useState(record.category);
    const [ description, setDescription ] = useState(record.description);
    const [ amount, setAmount ] = useState(record.amount);

    const { deleteRecord, updateRecord } = useContext(ExpenseRecordContext);
    

    const handleEdit = () => {
        console.log("EDITING: ", editField);
        console.log([editField]);


        const newRecord = {
            userId: record._id || "",
            [editField] : [editField]
        };
        console.log(newRecord);

        //updateRecord(newRecord);
    };

    const handleOnclick = (key) => {
        console.log(index, " CLIKED: ", key);
        setEditField(key);
    };

    const handleDelete = (id) => {
        deleteRecord(id);
    };

    let expenseRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if (expenseRef.current && !expenseRef.current.contains(e.target) && editField !== "") {
                handleEdit();
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
                <input className={`input ${editField === "date" ? "edit" : ""}`} id="date" value={date} onChange={(e) => setDate(e.target.value)} onClick={(e) => {handleOnclick(e.target.id)}}></input>
            </td>
            <td>
                <input className={`input ${editField === "category" ? "edit" : ""}`} id="category" value={category} onChange={(e) => setCategory(e.target.value)} onClick={(e) => {handleOnclick(e.target.id)}}></input>
            </td>
            <td>
                <input className={`input ${editField === "description"  ? "edit" : ""}`} id="description" value={description} onChange={(e) => setDescription(e.target.value)} onClick={(e) => {handleOnclick(e.target.id)}}></input>
            </td>
            <td>
                <input className={`input ${editField === "amount"  ? "edit" : ""}`} id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} onClick={(e) => {handleOnclick(e.target.id)}}></input>
            </td>
            <td>
                <button onClick={(e) => handleDelete(e.target.parentElement.parentElement.id)}>DELETE</button>
                {editField}
            </td>
        </tr>
    )
}
