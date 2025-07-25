import { ExpenseChart, IncomeChart } from './charts';

export const ExpenseSummary = () => {
    return (
        <div className="summary">
            <div>
                <h2>Income</h2>
                <IncomeChart />
            </div>
            <div>
                <h2>Expense</h2>
                <ExpenseChart />
            </div>
        </div>
    )
}
    /*
    const totalIncome = records
                        .filter((record) => record.category === "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

    const totalExpenses = records
                        .filter((record) => record.category !== "Income")
                        .reduce((sum, record) => {return sum + record.amount}, 0);

            <h4>Total Income: € {totalIncome.toFixed(2)}</h4>
            <h4>Total Expenses: € {totalExpenses.toFixed(2) * -1}</h4>
    */
