import { TransactionList, TransactionListFilters, TransactionListTableHead } from "../components/transaction-list/transaction-list";
import "./all-records.css"
import { useState } from "react";
import { LoadingIconSpinner } from "../components/loading-icon/loading";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { CaretDownIcon, CheckIcon, RowsIcon, SquaresFourIcon } from "@phosphor-icons/react";

export const AllRecords = () => {

   const [ loading, setLoading ] = useState(true);
   const [ isDataSelectorOpen, setIsDataSelectorOpen ] = useState(false);
   const [ data, setData ] = useState("all");
   const [ isList, setIsList ] = useState(true);

   setTimeout(() => {
      setLoading(false);
   }, 1500);

   const handleDataChange = (data) => {
      setData(data);
      setLoading(true);
      setIsDataSelectorOpen(false);
   };

   if (loading) {
      return (
         <div className='loading-screen-wrapper'>
            <LoadingIconSpinner />
         </div>
      );
   } else {
      return (
         <div className="all-record">
            <TransactionFilterContextProvider data={data}>
               <div className="filter-bar">
                  <div className="list-setting">
                     <div className="transaction-selector">
                        <div className="current-data" onClick={() => {setIsDataSelectorOpen(!isDataSelectorOpen)}}>
                           {data === "expense" ? "Expense Transactions" : (data === "income" ? "Income Transactions" : "My Transactions")} 
                           <CaretDownIcon size={18} />
                        </div>
                        <div className={`transaction-type ${isDataSelectorOpen && "open"}`}>
                           <div id="all" onClick={(e) => {handleDataChange(e.target.id)}}>
                              <span>All Transactions</span>
                              <CheckIcon size={20} weight="bold" className={`${data !== "all" && "hidden"}`}/>
                           </div>
                           <div id="income" onClick={(e) => {handleDataChange(e.target.id)}}>
                              <span>Income Transactions</span>
                              <CheckIcon size={20} weight="bold" className={`${data !== "income" && "hidden"}`}/>
                           </div>
                           <div id="expense" onClick={(e) => {handleDataChange(e.target.id)}}>
                              <span>Expense Transactions</span>
                              <CheckIcon size={20} weight="bold" className={`${data !== "expense" && "hidden"}`}/>
                           </div>
                        </div>
                     </div>
                     <div className="list-type" onClick={() => setIsList(!isList)}>
                        {isList ? <RowsIcon size={25} /> : <SquaresFourIcon size={25} />}
                     </div>
                  </div>
                  <TransactionListFilters />
                  <TransactionListTableHead />
               </div>
               <div className={`transaction-list ${!isList && "box"}`}>
                  <TransactionList />
               </div>
            </TransactionFilterContextProvider>
         </div>
      )
   }
}
export default AllRecords;
