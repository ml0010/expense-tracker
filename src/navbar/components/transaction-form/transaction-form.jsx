import { useContext, useEffect, useRef, useState } from 'react'
import { TransactionRecordContext } from '../../../contexts/transaction-record-context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Category } from '../../../pages/components/category';
import './transaction-form.css'
import { MenuToggleContext } from '../../../contexts/menu-toggle-context';
import { XIcon } from '@phosphor-icons/react';

export const TransactionForm = () => {
   
   const [ isFormOpen, setIsFormOpen ] = useState(false);
   const [ isExpense, setIsExpense ] = useState(false);
   
   const [ date, setDate ] = useState(new Date());
   const [ description, setDescription ] = useState("");
   const [ amount, setAmount ] = useState("");
   const [ category, setCategory ] = useState("");

   const { userId, addRecord } = useContext(TransactionRecordContext);
   const { showMenu } = useContext(MenuToggleContext);

   const resetInputs = () => {
      setDate(new Date());
      setDescription("");
      setAmount("");
      setCategory("");
      setIsExpense(false);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      
      // check amount is number
      if(isNaN(amount)) {
         alert("Your transaction amount must be a number.");
         return;
      }

      let newRecord;

      if (isExpense) {
         newRecord = {
            userId: userId,
            date: date,
            description: description,
            amount: Number(amount),
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
      closeForm();
      resetInputs();
   };

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

   let formRef = useRef(null);

   useEffect(() => {
      let handler = (e)=>{
         if(formRef.current && !formRef.current.contains(e.target)){
            closeForm();
         }
      };
      document.addEventListener("mousedown", handler);
      return() =>{
         document.removeEventListener("mousedown", handler);
      }
   }, [formRef]);

   useEffect(() => {
      const keyPressEvent = (e) => {
         if (e.key === 'Escape' && isFormOpen) {
            closeForm();
         }
      };
      document.addEventListener("keydown", keyPressEvent);
      return () => {
         document.removeEventListener("keydown", keyPressEvent);
      };
   }, [isFormOpen]);

   return (
      <div className={`transaction-form ${isFormOpen && 'open'} ${showMenu && 'menu-active'}`}>
         <div className="transaction-buttons">
            <div className="button" onClick={openIncomeForm}>ADD INCOME</div>
            <div className="button" onClick={openExpenseForm}>ADD EXPENSE</div>
         </div>
         {isFormOpen && 
            <>
               <div className="background"></div>
               <div className="transaction-form-wrapper">
                  <form onSubmit={handleSubmit} className="form" ref={formRef}>
                     <div className="form-title">{isExpense? 'Add Your Expense' : 'Add Your Income'}</div>
                     <div className="form-field">
                        <label>Date</label>
                        <DatePicker className="input" selected={date} dateFormat="yyyy/MM/dd" onChange={(date) => setDate(date)} />
                     </div>
                     {isExpense && 
                        <div className="form-field">
                           <label>Category</label>
                           <select className="input" defaultValue="" onChange={(e) => setCategory(e.target.value)} required>
                              <option value="">Select a Category</option>
                              <Category />
                           </select>
                        </div>
                     }
                     <div className="form-field">
                        <label>Description</label>
                        <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
                     </div>
                     <div className="form-field">
                        <label>Amount</label>
                        <input className="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required></input>
                     </div>

                     <button className="button" type="submit">Add Record</button>
                     <span className="close-button" onClick={closeForm}>
                        <XIcon size={15} />
                     </span>
                  </form>
               </div>
            </>
         }
      </div>
   )
}
