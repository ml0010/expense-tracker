import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import "./summary.css"
import { LoadingIcon } from "../components/loading-icon/loading";
import { useContext, useEffect, useState } from "react";
import { IncomePieChart } from "../components/charts/pie-charts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from "swiper/modules";
import { TransactionRecordContext } from "../../contexts/transaction-record-context";
import { SummaryMonthly } from "./components/summary-monthly";
import { SummaryYearly } from "./components/summary-yearly";

export const Income = () => {
   const [ loading, setLoading ] = useState(true);
   const [ slides, setSlides ] = useState(1);

   const { incomeRecords } = useContext(TransactionRecordContext);
   
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
         <TransactionFilterContextProvider data="income">
            <div className="summary income">
               <p className="page-title">My Income</p>
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
                           <h3>Monthly Income</h3>
                           <SummaryMonthly type="income" />
                        </div>
                     </SwiperSlide>                
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Yearly Income</h3>
                           <SummaryYearly type="income" />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="box-content">
                           <h3>Yearly Income Chart</h3>
                           <IncomePieChart />
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
export default Income;
