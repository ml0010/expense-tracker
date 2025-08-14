import { useContext, useEffect, useRef, useState } from 'react'
import { ExpenseRecordContext } from '../../../contexts/expense-record-context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Category } from '../category';
import './expense-form.css'
import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';

export const ExpenseForm = () => {
    
    const [ isFormOpen, setIsFormOpen ] = useState(false);
    const [ isExpense, setIsExpense ] = useState(false);
    
    const [ date, setDate ] = useState(new Date());
    const [ description, setDescription ] = useState("");
    const [ amount, setAmount ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ showFloatingButton, setShowFloatingButton ] = useState(false);   

    const { userId, addRecord } = useContext(ExpenseRecordContext);

    useEffect(() => {
        const handleFloatingBttnsVisibility = () => {
            window.pageYOffset > 150 ? setShowFloatingButton(true) : setShowFloatingButton(false);
        };
        window.addEventListener('scroll', handleFloatingBttnsVisibility);
        return () => {
            window.addEventListener('scroll', handleFloatingBttnsVisibility);
        };
    });
    
    const resetInputs = () => {
        setDate(new Date());
        setDescription("");
        setAmount("");
        setCategory("");
        setIsFormOpen(false);
        setIsExpense(false);
    };

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
        resetInputs();
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

    const closeForm = () => {
        setIsFormOpen(false);
        resetInputs();
    };

    return (
        <div className="expense-form">
            <div className="standard-buttons">
                <button className="standard-button" onClick={openIncomeForm}>
                    <p>Add Income</p>
                    <PlusCircleIcon size={80} weight="fill" />
                </button>
                <button className="standard-button" onClick={openExpenseForm}>
                    <p>Add Expense</p>
                    <MinusCircleIcon size={80} weight="fill" />
                </button>
            </div>
            {showFloatingButton? 
            <div className="floating-buttons">
                <div className={`floating-button income`} onClick={openIncomeForm}>
                    <PlusCircleIcon size={80} weight="fill" />
                    <p>Add Income</p>
                </div>
                <div className={`floating-button expense`} onClick={openExpenseForm}>
                    <MinusCircleIcon size={80} weight="fill" />
                    <p>Add Expense</p>
            </div>
            </div>
            : <></> }
            {isFormOpen? 
            <div className="expense-form-wrapper">
                <form onSubmit={handleSubmit} className="form" ref={formRef}>
                    <p className="form-title">{isExpense? 'Add Your Expense' : 'Add Your Income'}</p>
                    <div className="form-field">
                        <label>Date</label>
                        <DatePicker className="input" selected={date} dateFormat="yyyy/MM/dd" onChange={(date) => setDate(date)} />
                    </div>
                    <div className="form-field">
                        <label>Description</label>
                        <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
                    </div>
                    <div className="form-field">
                        <label>Amount</label>
                        <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required></input>
                    </div>
                    {isExpense ? 
                        <div className="form-field">
                            <label>Category</label>
                            <select className="input" defaultValue="" onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Select a Category</option>
                                <Category />
                            </select>
                        </div> : <></>
                    }
                    <div className="form-buttons">
                        <button className="button" type="submit">Add Record</button>
                        <button className="button" onClick={() => closeForm()}>Close</button>
                    </div>
                </form>
            </div>
            : <></>}
        </div>
    )
}
