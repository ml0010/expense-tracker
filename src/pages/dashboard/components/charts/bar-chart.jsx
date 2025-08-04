import React, { useContext, useEffect, useState } from 'react'
import { ExpenseRecordContext } from '../../../../contexts/expense-record-context';
import * as d3 from "d3";

export const BarChart = () => {

    const [ data, setData ] = useState([]);
    const { records } = useContext(ExpenseRecordContext);

    const numberOfDays = "15";

    const getData = () => {
        const data = [];
        for (let i = numberOfDays; i >= 0; i--) {
            const targetDate = new Date(new Date().setDate(new Date().getDate() - i)).toDateString();
            const recordsFiltered = records.filter((record) => new Date(record.date).toDateString()===targetDate);
            const amount = recordsFiltered.reduce((sum, record) => {return sum + record.amount}, 0);
            //console.log(targetDate);
            //console.log(recordsFiltered);
            //console.log(amount);
            data.push({date: `${new Date(targetDate).getDate()}/${new Date(targetDate).getMonth()+1}`, value: amount * -1 || 0});
        };
        return data;
    };

    // Set up dimensions
    const margin = { top: 20, right: 0, bottom: 30, left: 0 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    useEffect(() => {
        console.log(records);
        setData(getData());
    }, [records]);

    useEffect(() => {
        console.log("bar graph");
        console.log(data);

        d3.select("#bar-container")
            .select("svg")
            .remove();

        // Create SVG container
        const svg = d3.select("#bar-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        // Create scales
        const xScale = d3.scaleBand().domain(data.map((d) => d.date)).range([0, width]).padding(0.5);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).range([height, 0]);

        // Create bars
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.date))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.value))
            .attr("transform", "translate(30, 10)") 
            .attr("fill", "grey");

        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", (d) => xScale(d.date))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.value))
            .attr("transform", "translate(35, 8)") 
            .text((d) => d.value > 0 ? "€" + d.value : "")
            .attr("fill", "black")
            .style("font-size", "11px")
            .style("text-anchor", "middle");
            

        // Create x-axis
        const xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(30,${height+10})`)
            .call(xAxis);

        // Create y-axis
        const yAxis = d3.axisLeft(yScale).ticks(10);
;
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(30, 10)")
            .call(yAxis);

    }, [data]);

    return (
        <div id="bar-container">
        </div>
    )
}
