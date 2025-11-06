import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import { ExpenseDaily } from "./components/expense-daily";
import "./summary.css"
import { useEffect, useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { ExpensePieChart } from "../components/charts/pie-charts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { SummaryMonthly } from "./components/summary-monthly";
import { SummaryYearly } from "./components/summary-yearly";

export const Expense = () => {
   const [ loading, setLoading ] = useState(true);
   const [ slides, setSlides ] = useState(1);

   const setSlidesPerview = () => {
      setSlides(
         window.innerWidth <= 600
               ? 1
               : window.innerWidth <= 1100
               ? 2
               : window.innerWidth > 1100
               ? 3
               : 0
      );
   };

   useEffect(() => {
      setSlidesPerview();
      window.addEventListener("resize", setSlidesPerview);
      return () => {
         window.removeEventListener("resize", setSlidesPerview);
      };
   }, []);

   setTimeout(() => {
      setLoading(false);
   }, 1500);

   if (loading) {
      return <LoadingIcon />;
   } else {
      return (
         <TransactionFilterContextProvider data="expense">
            <div className="summary expense">
               <p className="page-title">My Expenses</p>
               <div className="tracker-wrapper">
                  <Swiper
                     slidesPerView={slides}
                     spaceBetween={20}
                     slidesPerGroup={1}
                     centeredSlides={false}
                     loop={false}
                     loopfillgroupwithblank="true"
                     touchStartPreventDefault={false}
                     scrollbar={{ draggable: true }}
                     navigation={true}
                     modules={[Navigation, Scrollbar]}
                     className="mySwiper"
                  >
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Daily Expenses</h3>
                           <ExpenseDaily />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Monthly Expenses</h3>
                           <SummaryMonthly type="expense" />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Yearly Expenses</h3>
                           <SummaryYearly type="expense" />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Yearly Expenses Chart</h3>
                           <ExpensePieChart />
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>
               <div className="list">
                  <h3>Transactions</h3>
                  <TransactionList />
               </div>
            </div>
         </TransactionFilterContextProvider>
      )
   }
}
export default Expense;
