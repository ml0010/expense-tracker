import { TransactionForm } from "../components/transaction-form/transaction-form";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import { IncomeMonthly } from "./components/income-monthly";
import { IncomeYearly } from "./components/income-yearly";
import { PiggyBankIcon } from "@phosphor-icons/react";
import "../expense/expense.css"
import { LoadingIcon } from "../components/loading-icon/loading";
import { useEffect, useState } from "react";
import { IncomePieChart } from "../components/charts/pie-charts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from "swiper/modules";

export const Income = () => {
    const [ loading, setLoading ] = useState(true);
    const [ slides, setSlides ] = useState(1);

    const setSlidesPerview = () => {
        setSlides(
            window.innerWidth <= 600
                ? 1
                : window.innerWidth <= 900
                ? 2
                : window.innerWidth > 900
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
                    <h1 className="title"><PiggyBankIcon size={50} /> Income Tracker</h1>
                    <TransactionForm />
                    <div className="tracker-wrapper">
                        <Swiper
                            slidesPerView={slides}
                            spaceBetween={20}
                            slidesPerGroup={1}
                            centeredSlides={false}
                            loop={false}
                            loopFillGroupWithBlank={false}
                            scrollbar={{ draggable: true }}
                            navigation={true}
                            modules={[Navigation, Scrollbar]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Monthly Income</h3>
                                    <IncomeMonthly />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Yearly Income</h3>
                                    <IncomeYearly />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Yearly Income Chart</h3>
                                    <IncomePieChart />
                                </div>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Monthly Income</h3>
                                    <IncomeMonthly />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="box-content">
                                <h3>Yearly Income</h3>
                                <IncomeYearly />
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
