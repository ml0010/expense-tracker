import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Category } from './category';

export const ExpenseForm = () => {
    
    const [ isFormOpen, setIsFormOpen ] = useState(false);
    const [ isExpense, setIsExpense ] = useState(false);
    const [ date, setDate ] = useState(new Date());
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ category, setCategory ] = useState("");

    const { userId, addRecord } = useContext(ExpenseRecordContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        let newRecord;

        if (isExpense) {
            newRecord = {
                userId: userId,
                date: date,
                description: description,
                amount: Number(amount * -1),
                category: category
            };
        } else {
            newRecord = {
                userId: userId,
                date: date,
                description: description,
                amount: Number(amount),
                category: "Income"
            };
        }

        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setCategory("");
        setIsFormOpen(false);
        setIsExpense(false);
    };

    let formRef = useRef(null);

    useEffect(() => {
        let handler = (e)=>{
            if(formRef.current && !formRef.current.contains(e.target)){
                setIsFormOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    }, [formRef]);

    const openIncomeForm = () => {
        setIsFormOpen(!isFormOpen);
        setIsExpense(false);
    };

    const openExpenseForm = () => {
        setIsFormOpen(!isFormOpen);
        setIsExpense(true);
    };

    return (
        <div className="expense-form">
            <div className="buttons">
                <button className="button" onClick={openIncomeForm}>Add Income</button>
                <button className="button" onClick={openExpenseForm}>Add Expense</button>
            </div>
            {isFormOpen? 
            <div className="expense-form-wrapper">
                <form onSubmit={handleSubmit} className="form" ref={formRef}>
                    <p className="form-title">{isExpense? 'Add Your Expense' : 'Add Your Income'}</p>
                    <div className="form-field">
                        <label>Date</label>
                        <DatePicker selected={date} dateFormat="yyyy/MM/dd" onChange={(date) => setDate(date)} />
                    </div>
                    <div className="form-field">
                        <label>Description</label>
                        <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}required></input>
                    </div>
                    <div className="form-field">
                        <label>Amount</label>
                        <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)}required></input>
                    </div>
                    {isExpense ? 
                        <div className="form-field">
                            <label>Category</label>
                            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}required>
                                <option value="">Select a Category</option>
                                <Category />
                            </select>
                        </div> : <></>
                    }
                    <div className="form-buttons">
                        <button className="button" type="submit">Add Record</button>
                        <button className="button" onClick={() => setIsFormOpen(false)}>Close</button>
                    </div>
                </form>
            </div>
            : <></>}
        </div>
    )
}
