import * as d3 from "d3";
import { CategoryIcons } from "../category";

const Arc = ({ data, index, createArc, colors, format, total }) => (
    <g key={index} className="arc">
        <path className="path" d={createArc(data)} fill={colors(index)} />
        <text
            className="text"
            transform={`translate(${createArc.centroid(data)[0]*1.6}, ${createArc.centroid(data)[1]*1.6})`}
            y="5"
            textAnchor="middle"
            fill="black"
            fontSize="10"
        >
        {format(data.value)}
        </text>
        <text
            className="text"
            transform={`translate(${createArc.centroid(data)[0]*1.6}, ${createArc.centroid(data)[1]*1.6})`}
            y="-5"
            textAnchor="middle"
            fill="black"
            fontSize="10"
        >
        {data.data.name}
        </text>
        {index === 0 ? <>
                <text
            textAnchor="middle"
            fill="black"
            fontSize="25"
        >
        € {total}
        </text>
        <text
            className="total-text"
            y="20"
            textAnchor="middle"
            fill="var(--color-font-light)"
            fontSize="13"
        >
        Total Amount
        </text>
        </> : <></>}
    </g>
);


export const Pie = (props) => {

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);

    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);


    const format = d3.format(".2f");
    const data = createPie(props.data);

    const getColors = () => {
        if (props.name === "expense") {
            const colorList = [];
            data.map((data) => {
                const category = CategoryIcons.find((category) => category.title === data.data.name);
                colorList.push(category.color);
            });
            return colorList;
        }
        return d3.schemeSet3;
    };

    const colors = d3.scaleOrdinal(getColors());

    return (
        <svg className="pie" width={props.width * 1.1} height={props.height  * 1.1}>
            <g transform={`translate(${props.outerRadius * 1.5} ${props.outerRadius * 1.5})`}>
                {data.map((data, index) => (
                    <Arc 
                        key={index}
                        index={index}
                        data={data}
                        createArc={createArc}
                        colors={colors}
                        format={format}
                        total={props.total}
                    />
                ))}
            </g>
        </svg>
    );
}

export default Pie;



/*
export const Pie = (props) => {
    const {
        data,
        width,
        height,
        innerRadius,
        outerRadius
    } = props;

    const colorScale = d3     
        .scaleSequential()      
        .interpolator(d3.interpolateCool)      
        .domain([0, data.length]);

    useEffect(() => {
        drawChart();
    }, [data]);


    const drawChart = () => {
        d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.value)
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
        arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.name)
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
    };

    

    return (
        <div id="pie-container"></div>
    );
}
*/
