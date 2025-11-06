import { TransactionList } from "../components/transaction-list/transaction-list";
import "./all-records.css"
import { useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { RowsIcon, SquaresFourIcon } from "@phosphor-icons/react";

export const AllRecords = () => {

   const [ loading, setLoading ] = useState(true);
   const [ data, setData ] = useState("");
   const [ isList, setIsList ] = useState(true);

   setTimeout(() => {
      setLoading(false);
   }, 1500);

   const handleDataChange = (data) => {
      setData(data);
      setLoading(true);
   };

   if (loading) {
      return <LoadingIcon />;
   } else {
      return (
         <div className="all-record">
            <div className="setting">
               <div className="transaction-type">
                  <span id="all" onClick={(e) => {handleDataChange(e.target.id)}}>My Transactions</span>
                  <span id="income" onClick={(e) => {handleDataChange(e.target.id)}}>Income Transactions</span>
                  <span id="expense" onClick={(e) => {handleDataChange(e.target.id)}}>Expense Transactions</span>
               </div>
               <div className="list-type" onClick={() => setIsList(!isList)}>
                  {isList ? <RowsIcon size={25} /> : <SquaresFourIcon size={25} />}
               </div>
            </div>
            <div className={`transaction-list ${!isList && "box"}`}>
               <TransactionFilterContextProvider data={data}>
                  <TransactionList />
               </TransactionFilterContextProvider>
            </div>
         </div>
      )
   }
}
export default AllRecords;
