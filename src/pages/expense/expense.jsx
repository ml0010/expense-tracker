import { TransactionForm } from "../components/transaction-form/transaction-form";
import { TransactionFilterContextProvider } from "../../contexts/transaction-filter-context";
import { TransactionList } from "../components/transaction-list/transaction-list";
import { ExpenseDaily } from "./components/expense-daily";
import { ExpenseMonthly } from "./components/expense-monthly";
import { MoneyIcon } from "@phosphor-icons/react";
import { ExpenseYearly } from "./components/expense-yearly";
import "./expense.css"
import { useEffect, useState } from "react";
import { LoadingIcon } from "../components/loading-icon/loading";
import { ExpensePieChart } from "../components/charts/pie-charts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

export const Expense = () => {
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
            <TransactionFilterContextProvider data="expense">
                <div className="summary expense">
                    <h1 className="title"><MoneyIcon size={50} /> Expenses Tracker</h1>
                    <TransactionForm />
                    <div className="tracker-wrapper">
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
                                    <h3>Daily Expenses</h3>
                                    <ExpenseDaily />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Monthly Expenses</h3>
                                    <ExpenseMonthly />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="box-content">
                                    <h3>Yearly Expenses</h3>
                                    <ExpenseYearly />
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
