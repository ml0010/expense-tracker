import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react'

export const ExpenseRecordContext = createContext(null);

export const ExpenseRecordContextProvider = (props) => {

    const { user, isSignedIn } = useUser();

    const [ username, setUsername ] = useState("");
    const [ userId, setUserId ] = useState("");

    const [ records, setRecords ] = useState([]);
    const [ incomeRecords, setIncomeRecords ] = useState([]);
    const [ incomeTotal, setIncomeTotal ] = useState(null);
    const [ expenseRecords, setExpenseRecords ] = useState([]);
    const [ expenseTotal, setExpenseTotal ] = useState(null);
    const [ balance, setBalance ] = useState(null);

    const getTotal = (records) => {
        return records.reduce((sum, record) => {return sum + record.amount}, 0);
    };

    useEffect(() => {
        if (isSignedIn) {
            setUsername(user.externalAccounts[0].firstName);
            setUserId(user.id);
            console.log(`Fetching ${user.externalAccounts[0].firstName}'s expenses...`);
        }
        fetchRecords();
    }, [user]);
    
    useEffect(() => {
        const incomeRecords = records.filter((record) => record.category === "Income");
        const incomeTotal = getTotal(incomeRecords);
        const expenseRecords = records.filter((record) => record.category !== "Income");
        const expenseTotal = getTotal(expenseRecords);
        setIncomeRecords(incomeRecords);
        setExpenseRecords(expenseRecords);
        setIncomeTotal(incomeTotal.toFixed(2));
        setExpenseTotal(expenseTotal.toFixed(2) * -1);
        setBalance((incomeTotal + expenseTotal).toFixed(2));

    }, [records]);

    const fetchRecords = async () => {
        if(!user) return;
        const response = await fetch(`https://expense-tracker-qvcr.onrender.com/expense-records/${user.id}`);
        if (response.ok) {
            const records = await response.json();
            console.log(records);
            records.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
            setRecords(records);
        }
    };

    const addRecord = async (record) => {
        const response = await fetch("https://expense-tracker-qvcr.onrender.com", {
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
        const response = await fetch(`https://expense-tracker-qvcr.onrender.com/${id}`, {
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
        const response = await fetch(`https://expense-tracker-qvcr.onrender.com/${id}`, {
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

    const contextValue = { username, userId, records, incomeRecords, expenseRecords, getTotal, incomeTotal, expenseTotal, balance, addRecord, deleteRecord, updateRecord };
    return (
        <ExpenseRecordContext.Provider value={contextValue}>{props.children}</ExpenseRecordContext.Provider>
    )
}
