import { useUser } from '@clerk/clerk-react';
import React, { createContext, useEffect, useState } from 'react'

export const ExpenseRecordContext = createContext(null);

export const ExpenseRecordContextProvider = (props) => {

    const { user, isSignedIn } = useUser();

    const expenseRecordDefault = {
        _id: "",
        userId: "",
        date: "",
        description: "",
        category: ""
    };

    const [ records, setRecords ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ userId, setUserId ] = useState("");

    const fetchRecords = async () => {
        if(!user) return;
        const response = await fetch(`http://localhost:3001/expense-records/${user.id}`);
        if (response.ok) {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            setUsername(user.externalAccounts[0].firstName);
            setUserId(user.id);
            console.log(user);
            console.log(`Fetching ${user.externalAccounts[0].firstName}'s expenses...`);
        }
        fetchRecords();
    }, [user]);
    
    const addRecord = async (record) => {
        const response = await fetch("http://localhost:3001", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json"
            }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (err) {
            console.log(err);
        }
    };


    const contextValue = { username, userId, records, addRecord };
    return (
        <ExpenseRecordContext.Provider value={contextValue}>{props.children}</ExpenseRecordContext.Provider>
    )
}
