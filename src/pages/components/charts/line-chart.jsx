import { useContext, useEffect, useState } from "react";
import { ExpenseRecordContext } from "../../../contexts/expense-record-context";
import * as d3 from "d3";
import "./line-chart.css";

export const LineChart = () => {

    const { monthlyRecords, getTotal } = useContext(ExpenseRecordContext);
    
    const [ data, setData ] = useState([]);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getData = () => {
        const data = [];
        monthlyRecords.slice(0, new Date().getMonth() + 1).forEach((records, index) => {
            const month = index;
            const incomeTotal = getTotal(records.filter((record) => record.category === "Income"));
            const expenseTotal = getTotal(records.filter((record) => record.category !== "Income"));

            data.push({month: month, income: incomeTotal, expense: `${expenseTotal < 0 ? expenseTotal * -1 : expenseTotal}`});
        });
        console.log(data);
        return data;
    };

    const createGraph = async () => {

        const heightValue = 300;
        const widthValue = 450;

        var margin = { top: 20, right: 10, bottom: 20, left: 40 };
        var width = widthValue - margin.left - margin.right;
        var height = heightValue - margin.top - margin.bottom;

        d3.select("#line-chart")
            .select("svg")
            .remove();

        var svg = d3.select("#line-chart")
                    .append("svg")
                    .attr("id", "chart")
                    .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)
                    .append("g")
                    .attr("transform", `translate(${margin.left}, 0)`);

        var xScale = d3.scaleBand().range([0, width]).domain(data.map((d) => months[d.month]));
        var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, (d) => d.income < d.expense ? d.expense : d.income)]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));   
            
        svg.append("g")
            .call(d3.axisLeft(yScale));

        var incomeLine = d3.line()
                        .curve(d3.curveBasis)
                        .x((d) => {return xScale(months[d.month]) + 30})
                        .y((d) => {return yScale(d.income)});
        
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "transparent")
            .attr("stroke", "var(--color-1)")
            .attr("stroke-width", 1.5)
            .attr("d", incomeLine)

        var expenseLine = d3.line()
                .curve(d3.curveBasis)
                .x((d) => {return xScale(months[d.month]) + 30})
                .y((d) => {return yScale(d.expense)});

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "var(--color-2)")
            .attr("stroke-width", 1.5)
            .attr("d", expenseLine);

        const tooltip = d3.select("#line-chart")
                        .append("div")
                        .attr("class", "tooltip")
                        .style("position", "absolute")
                        .style("background", "white")
                        .style("z-index", "100");

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(months[d.month]))
            .attr("y", (d) => 0)
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d3.max(data, (d) => d.income)))
            .attr("fill", "transparent")
            .on("mouseover", (event, d) => {
                const [mx, my] = d3.pointer(event);
                const tooltipText = `<b>${months[d.month]}</b><br>Income: € ${d.income}<br>Expense: € ${d.expense}<br>Balance: € ${(d.income - d.expense).toFixed(2)}`;
                
                tooltip.style("top", `${my}px`)
                        .style("left", `${mx - 50}px`)
                        .attr("data-date", d['data-date'])
                        .style("display", "block")
                        .html(tooltipText);
            })
            .on("mouseout", () => { tooltip.style("display", "none")});
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
