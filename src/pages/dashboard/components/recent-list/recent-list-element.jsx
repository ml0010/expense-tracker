import { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import DatePicker from 'react-datepicker';
import { XIcon } from '@phosphor-icons/react';
import { CategoryIcons } from '../category';

export const RecentListElement = ({record, index}) => {

    const [ editField, setEditField ] = useState("");
    const [ newValue, setNewValue ] = useState("");
    const [ id, setId ] = useState(record._id);
    const [ date, setDate ] = useState(new Date(record.date));
    const [ category, setCategory ] = useState(record.category);
    const [ description, setDescription ] = useState(record.description);
    const [ amount, setAmount ] = useState(record.amount);

    const { deleteRecord, updateRecord } = useContext(ExpenseRecordContext);
    
    useEffect(() => {
        setId(record._id);
        setDate(new Date(record.date));
        //setCategory(record.category);
        setDescription(record.description);
        setAmount(record.amount);
    }, [record]);

    const handleEdit = (key, value) => {
        if (value === "") {
            return;
        }

        const newRecord = { 
            [key] : value
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

    const handleDateChange = (date) => {
        handleEdit(editField, date);
        setNewValue("");
        setEditField("");
    };

    /*
    const handleCategoryChange = (category) => {
        handleEdit(editField, category);
        setNewValue("");
        setEditField("");
    };
*/
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
        <tr id={id} className="element" ref={expenseRef} key={index}>
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
            <td className="description">
                <div className="category">
                    {CategoryIcons.map((category, index) => {
                        if (category.title === record.category) {
                            return <div className="icon" style={{backgroundColor: category.color}} key={index}><category.icon size={21} weight="regular" /></div>;
                        }
                    })}
                </div>
                <input 
                    className={`input ${editField === "description"  ? "edit" : ""}`} 
                    id="description" 
                    value={description} 
                    onChange={(e) => handleChange(setDescription, e.target.value)} 
                    onClick={(e) => handleOnclick(e.target.id)}
                    onKeyDown={(e) => handleEditSubmit(e)}
                ></input>
            </td>
            <td className="amount">
                € 
                <input 
                    className={`input ${editField === "amount"  ? "edit" : ""}`} 
                    id="amount" value={amount}
                    onChange={(e) => handleChange(setAmount, e.target.value)} 
                    onClick={(e) => handleOnclick(e.target.id)}
                    onKeyDown={(e) => handleEditSubmit(e)}
                ></input>
            </td>
            <td>
                <button className="delete-button" id={id} ><XIcon size={20} onClick={(e) => handleDelete(e.target.parentElement.id)} /></button>
            </td>
        </tr>
    )
}
