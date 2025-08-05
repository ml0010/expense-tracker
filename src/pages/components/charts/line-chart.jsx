import { useContext, useEffect, useState } from "react";
import { ExpenseRecordContext } from "../../../contexts/expense-record-context";
import * as d3 from "d3";

export const LineChart = () => {

    const { monthlyRecords, getTotal } = useContext(ExpenseRecordContext);
    
    const [ data, setData ] = useState([]);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getData = () => {
        const data = [];
        monthlyRecords.forEach((records, index) => {
            const month = index;
            const incomeTotal = getTotal(records.filter((record) => record.category === "Income"));
            const expenseTotal = getTotal(records.filter((record) => record.category !== "Income"));

            data.push({month: month, income: incomeTotal, expense: `${expenseTotal < 0 ? expenseTotal * -1 : expenseTotal}`});
        });
        console.log(data);
        return data.slice(0, new Date().getMonth());
    };

    const createGraph = async () => {
        var margin = { top: 20, right: 20, bottom: 50, left: 70 };
        var width = 500 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        d3.select("#line-chart")
            .select("svg")
            .remove();

        var svg = d3.select("#line-chart")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var x = d3.scaleBand().range([0, width]).domain(data.map((d) => d.month));
        var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, (d) => d.income)]);


        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));   
            
        svg.append("g")
            .call(d3.axisLeft(y));

        var incomeLine = d3.line()
                        .curve(d3.curveBasis)
                        .x((d) => {return x(d.month) + 30})
                        .y((d) => {return y(d.income)});

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "var(--color-1)")
            .attr("stroke-width", 1.5)
            .attr("d", incomeLine);

        var expenseLine = d3.line()
                .curve(d3.curveBasis)
                .x((d) => {return x(d.month) + 30})
                .y((d) => {return y(d.expense)});
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "var(--color-2)")
            .attr("stroke-width", 1.5)
            .attr("d", expenseLine);
    }

    useEffect(() => {
        setData(getData());
    }, [monthlyRecords]);

    useEffect(() => {
        createGraph();
    }, [data]);

    return (
        <div id="line-chart"></div>
    )
}
