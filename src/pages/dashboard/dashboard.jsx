import './dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { TransactionRecordContext } from '../../contexts/transaction-record-context';
import { TransactionForm } from '../components/transaction-form/transaction-form';
import { Summary } from './components/summary/summary';
import { RecentList } from './components/recent-list/recent-list';
import { MonthlySummary } from './components/summary/summary-month';
import { TransactionFilterContextProvider } from '../../contexts/transaction-filter-context';
import { Link } from 'react-router-dom';
import { LineChart } from '../components/charts/line-chart';
import { LoadingIcon, LoadingIconSmall } from '../components/loading-icon/loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';

export const Dashboard = () => {

   const { isRecordLoaded, incomeRecords, expenseRecords } = useContext(TransactionRecordContext);
   
   const [loading, setLoading] = useState(true);
   const [ slides, setSlides ] = useState(1);

   const setSlidesPerview = () => {
      setSlides(
         window.innerWidth <= 700
               ? 1
               : window.innerWidth <= 1200
               ? 2
               : window.innerWidth > 1200
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
         <div className="dashboard">
               <h1>Dashboard</h1>
               <div className="summary-wrapper">
                  <Swiper
                     slidesPerView={slides}
                     spaceBetween={20}
                     slidesPerGroup={1}
                     centeredSlides={false}
                     loop={false}
                     loopFillGroupWithBlank={true}
                     touchStartPreventDefault={false}
                     scrollbar={{ draggable: true }}
                     navigation={true}
                     modules={[Navigation, Scrollbar]}
                     className="mySwiper"
                  >
                     <SwiperSlide>
                           <div className="box-content">
                              <Summary />
                           </div>
                     </SwiperSlide>
                     <SwiperSlide>
                           <div className="box-content">
                              <TransactionFilterContextProvider>
                                 <MonthlySummary />
                              </TransactionFilterContextProvider>
                           </div>
                     </SwiperSlide>
                     <SwiperSlide>
                           <div className="box-content">
                              <LineChart />
                           </div>
                     </SwiperSlide>
                  </Swiper>
               </div>
               <div className="boxes">
                  <div className="box">
                     <span className="title">Income</span>
                     {isRecordLoaded ?
                           <div className="recent-transaction">
                              <Link className="link" to="../income">See All</Link>
                              <span className="description">Recent Transactions</span>
                              <RecentList records={incomeRecords} /> 
                           </div>
                           : <LoadingIconSmall />
                     }
                  </div>
                  <div className="box">
                     <span className="title">Expense</span>
                     {isRecordLoaded ?
                           <div className="recent-transaction">
                              <Link className="link" to="../expense">See All</Link>
                              <span className="description">Recent Transactions</span>
                              <RecentList records={expenseRecords} /> 
                           </div>
                           : <LoadingIconSmall />
                     }
                  </div>
               </div>
         </div>
      )
   }
}
export default Dashboard;