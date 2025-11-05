import { TransactionList } from "../components/transaction-list/transaction-list";
import "../expense/summary.css"
import { useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";

export const AllRecords = () => {

   const [loading, setLoading] = useState(true);

   setTimeout(() => {
      setLoading(false);
   }, 1500);

   if (loading) {
      return <LoadingIcon />;
   } else {
      return (
         <div className="all-record">
            <div className="list">
               <TransactionList />
            </div>
         </div>
      )
   }
}
export default AllRecords;
