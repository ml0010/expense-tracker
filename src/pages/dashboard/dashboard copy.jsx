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
            <div className="dashboard">
                <h1>Dashboard</h1>
                <TransactionForm />
                <div className="summary-wrapper">
                    <Swiper
                        slidesPerView={slides}
                        spaceBetween={20}
                        slidesPerGroup={1}
                        centeredSlides={false}
                        loop={false}
                        loopFillGroupWithBlank={true}
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
                                <h2>Monthly Chart</h2>
                                {isRecordLoaded ?
                                    <div>
                                        <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
                                        <LineChart />
                                    </div>
                                    : <LoadingIconSmall />
                                }
                            </div>
                        </SwiperSlide>
                        
                    </Swiper>
                </div>
                <div className="boxes two">
                    <div className="box">
                        <Summary />
                    </div>
                    <div className="box">
                        <TransactionFilterContextProvider>
                            <MonthlySummary />
                        </TransactionFilterContextProvider>
                    </div>
                </div>
                <div className="boxes three">
                    <div className="box">
                        <h2>Monthly Chart</h2>
                        {isRecordLoaded ?
                            <div>
                                <Link className="link" to="/all" state={{ period: "month" }}>See More</Link>
                                <LineChart />
                            </div>
                            : <LoadingIconSmall />
                        }
                    </div>
                    <div className="box">
                        <h2>Income</h2>
                        {isRecordLoaded ?
                            <div className="recent-transaction">
                                <Link className="link" to="../income">See All</Link>
                                <div className="title">
                                    <p className="text">Recent Transactions</p>
                                </div>
                                <RecentList records={incomeRecords} /> 
                            </div>
                            : <LoadingIconSmall />
                        }
                    </div>
                    <div className="box">
                        <h2>Expense</h2>
                        {isRecordLoaded ?
                            <div className="recent-transaction">
                                <Link className="link" to="../expense">See All</Link>
                                <div className="title">
                                    <p className="text">Recent Transactions</p>
                                </div>
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