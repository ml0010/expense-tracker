import { useUser } from '@clerk/clerk-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
        <div>
            <button onClick={openIncomeForm}>Add Income</button>
            <button onClick={openExpenseForm}>Add Expense</button>
            {isFormOpen? 
            <div className="expense-form-wrapper">
                <form onSubmit={handleSubmit} className="expense-form" ref={formRef}>
                    <p className="form-title">Add Your Expense</p>
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
                                <option value="Grocery">Grocery</option>
                                <option value="Rent">Rent</option>
                                <option value="Mortgage">Mortgage</option>
                                <option value="Entertaintment">Entertaintment</option>
                                <option value="Eating Out">Eating-Out</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Fuel">Fuel</option>
                                <option value="Utility">Utility</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Subscription">Subscription</option>
                                <option value="Other">Other</option>
                            </select>
                        </div> : <></>
                    }
                    <div className="form-buttons">
                        <button type="submit" className="button">Add Record</button>
                        <button onClick={() => setIsFormOpen(false)}>Close</button>
                    </div>
                </form>
            </div>
            : <></>}
        </div>
    )
}
