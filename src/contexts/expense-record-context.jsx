import { useUser } from '@clerk/clerk-react';
import React, { createContext, useEffect, useState } from 'react'

export const ExpenseRecordContext = createContext(null);

export const ExpenseRecordContextProvider = (props) => {

    const { user, isSignedIn } = useUser();

    const [ records, setRecords ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ userId, setUserId ] = useState("");

    const fetchRecords = async () => {
        if(!user) return;
        const response = await fetch(`http://localhost:3001/expense-records/${user.id}`);
        if (response.ok) {
            const records = await response.json();
            console.log(records);
            records.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
            setRecords(records);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            setUsername(user.externalAccounts[0].firstName);
            setUserId(user.id);
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
                setRecords((prev) => [newRecord, ...prev]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateRecord = async (id, newRecord) => {

        console.log(newRecord);

        const response = await fetch(`http://localhost:3001/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json"
            }
        });
        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => 
                    prev.map((record) => {
                        if(record._id === id) {
                            return newRecord;
                        } else {
                            return record;
                        }
                    })
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecord = async (id) => {
        const response = await fetch(`http://localhost:3001/${id}`, {
            method: "DELETE"
        });
        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const contextValue = { username, userId, records, addRecord, deleteRecord, updateRecord };
    return (
        <ExpenseRecordContext.Provider value={contextValue}>{props.children}</ExpenseRecordContext.Provider>
    )
}
