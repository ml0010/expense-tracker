import { TransactionFilterContext } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import "../expense/expense.css"
import { useContext, useEffect, useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { useLocation } from "react-router-dom";

export const AllRecords = () => {

   const [loading, setLoading] = useState(true);

   const { handlePeriodChange } = useContext(TransactionFilterContext);

   const location = useLocation();
   const { period, start, end } = location.state || "";

   useEffect(() => {
      handlePeriodChange(period, start, end);
   }, [period]);

   setTimeout(() => {
      setLoading(false);
   }, 1500);

   if (loading) {
      return <LoadingIcon />;
   } else {
      return (
         <div className="summary all-record">
               <p className="page-title">All Records</p>
               <div className="list">
                  <h3>Transactions</h3>
                  <TransactionList />
               </div>
         </div>
      )
   }
}
export default AllRecords;
