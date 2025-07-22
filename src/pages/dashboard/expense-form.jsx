import { useUser } from '@clerk/clerk-react';
import React, { useContext, useState } from 'react'
import { ExpenseRecordContext } from '../../contexts/expense-record-context';

export const ExpenseForm = () => {
    
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ category, setCategory ] = useState("");

    const { userId, addRecord } = useContext(ExpenseRecordContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecord = {
            userId: userId,
            date: new Date,
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

    return (
        <div className="expense-form">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Description: </label>
                    <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}required></input>
                </div>
                <div className="form-field">
                    <label>Amount: </label>
                    <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)}required></input>
                </div>
                <div className="form-field">
                    <label>Category: </label>
                    <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}required>
                        <option value="">Select a Category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Rent">Rent</option>
                        <option value="Entertaintment">Entertaintment</option>
                        <option value="Eat-Out">Eat-Out</option>
                        <option value="Utility">Utility</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Income">Income</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className='button'>Add Record</button>
            </form>
        </div>
    )
}
