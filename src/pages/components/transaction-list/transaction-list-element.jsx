import { useContext, useEffect, useRef, useState } from 'react'
import { TransactionRecordContext } from '../../../contexts/transaction-record-context';
import DatePicker from 'react-datepicker';
import { Category, CategoryIcons} from '../category';
import { XIcon } from '@phosphor-icons/react';


export const TransactionListElement = ({record, index}) => {

    const [ isEdit, setIsEdit ] = useState(false);
    const [ editField, setEditField ] = useState("");
    const [ newValue, setNewValue ] = useState("");
    const [ id, setId ] = useState(record._id);
    const [ date, setDate ] = useState(new Date(record.date));
    const [ category, setCategory ] = useState(record.category);
    const [ description, setDescription ] = useState(record.description);
    const [ amount, setAmount ] = useState(record.amount);

    const { deleteRecord, updateRecord } = useContext(TransactionRecordContext);
    
    useEffect(() => {
        setId(record._id);
        setDate(new Date(record.date));
        setCategory(record.category);
        setDescription(record.description);
        setAmount(record.amount);
    }, [record]);

    const handleEdit = (key, value) => {
        setIsEdit(false);
        if (value === "") {
            return;
        }

        const newRecord = { 
            [key] : value
        };
        updateRecord(record._id, newRecord);
    };

    const handleOnclick = (key) => {
        setIsEdit(true);
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

    const handleCategoryChange = (category) => {
        handleEdit(editField, category);
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

    let listRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if (listRef.current && !listRef.current.contains(e.target) && editField !== "") {
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
        <>
        <div className={`element-wrapper ${isEdit && "active"}`}></div>
        <tr id={id} className="element" ref={listRef} key={index}>
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
                <div className="category">
                    {CategoryIcons.map((category, index) => {
                        if (category.title === record.category) {
                            return <div className="icons" style={{color: category.color}} key={index}><category.icon size={21} weight="regular" /></div>;
                        }
                        return null;
                    })}
                    <select
                        className={`input ${editField === "category" ? "edit" : ""}`}
                        id="category" 
                        value={category || ""} 
                        onChange={(e) => {
                            handleChange(setCategory, e.target.value);
                            handleCategoryChange(e.target.value);
                        }} 
                        onMouseDown={(e) => {handleOnclick(e.target.id)}} 
                    >
                        {amount > 0 ? <option value="Income">Income</option> : <></>}
                        <Category />
                    </select>
                </div>
            </td>
            <td>
                <input 
                    className={`input ${editField === "description"  ? "edit" : ""}`} 
                    id="description" 
                    value={description || ""} 
                    onChange={(e) => handleChange(setDescription, e.target.value)} 
                    onClick={(e) => handleOnclick(e.target.id)}
                    onKeyDown={(e) => handleEditSubmit(e)}
                ></input>
            </td>
            <td>
                <div className="input-wrapper">
                    <p>€</p> 
                    <input 
                        className={`input ${editField === "amount"  ? "edit" : ""}`} 
                        id="amount"
                        value={amount || ""}
                        onChange={(e) => handleChange(setAmount, e.target.value)} 
                        onClick={(e) => handleOnclick(e.target.id)}
                        onKeyDown={(e) => handleEditSubmit(e)}
                    ></input>
                </div>
            </td>
            <td>
                <button className="delete-button" id={id} ><XIcon size={16} onClick={(e) => handleDelete(e.target.parentElement.id)} /></button>
            </td>
        </tr>
        </>
    )
}
