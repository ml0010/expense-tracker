import { useContext, useEffect, useRef, useState } from 'react'
import { TransactionRecordContext } from '../../../contexts/transaction-record-context';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Category } from '../category';
import './transaction-form.css'

export const TransactionForm = () => {
   
   const [ isFormOpen, setIsFormOpen ] = useState(false);
   const [ isExpense, setIsExpense ] = useState(false);
   
   const [ date, setDate ] = useState(new Date());
   const [ description, setDescription ] = useState("");
   const [ amount, setAmount ] = useState("");
   const [ category, setCategory ] = useState("");

   const { userId, addRecord } = useContext(TransactionRecordContext);

   const resetInputs = () => {
      setDate(new Date());
      setDescription("");
      setAmount("");
      setCategory("");
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
      closeForm();
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
      <div className={`transaction-form ${isFormOpen && 'open'}`}>
         <div className="standard-buttons">
               <span className="add-button income" onClick={openIncomeForm}>ADD INCOME</span>
               <span className="add-button expense" onClick={openExpenseForm}>ADD EXPENSE</span>
         </div>
         {isFormOpen && 
            <div className="transaction-form-wrapper">
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
                        <button className="button" onClick={closeForm}>Close</button>
                     </div>
                  </form>
            </div>
         }
      </div>
   )
}
