import { useUser } from '@clerk/clerk-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';

export const ExpenseForm = () => {
    
    const [ isFormOpen, setIsFormOpen ] = useState(false);
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ category, setCategory ] = useState("");

    const { userId, addRecord } = useContext(ExpenseRecordContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecord = {
            userId: userId,
            date: new Date(),
            description: description,
            amount: amount,
            category: category
        };
        console.log(newRecord);
        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setCategory("");
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

    return (
        <div className="expense-form-wrapper">
            <button onClick={() => setIsFormOpen(!isFormOpen)}>Add Expense</button>
            {isFormOpen? 
                <form onSubmit={handleSubmit} className="expense-form" ref={formRef}>
                    <p>Add Your Expense</p>
                    <div className="form-field">
                        <label>Description</label>
                        <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}required></input>
                    </div>
                    <div className="form-field">
                        <label>Amount</label>
                        <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)}required></input>
                    </div>
                    <div className="form-field">
                        <label>Category</label>
                        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}required>
                            <option value="">Select a Category</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Rent">Rent</option>
                            <option value="Mortgage">Mortgage</option>
                            <option value="Entertaintment">Entertaintment</option>
                            <option value="Eat-Out">Eat-Out</option>
                            <option value="Utility">Utility</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="button">Add Record</button>
                    <button className="button" onClick={() => setIsFormOpen(false)}>Close</button>
                </form>
            : <></>}
        </div>
    )
}
