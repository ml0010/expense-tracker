import * as d3 from "d3";
import { CategoryIcons } from "../category";

export const Pie = (props) => {

   const margin = { top: 50, right: 10, bottom: 50, left: 10 };
   const width = props.width - margin.left - margin.right;
   const height = props.height - margin.top - margin.bottom;
   const radius = Math.min(width, height) / 2;

   const format = d3.format(".2f");

   const createPie = d3
      .pie()
      .padAngle(0)
      .value(d => d.value)
      .sort(null);

   const data = createPie(props.data);

   //console.log(data);

   const createArc = d3
      .arc()
      .innerRadius(radius * 0.45)
      .outerRadius(radius * 0.8);

   const createOuterArc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 1);

   const getColors = () => {
      if (props.name === "expense") {
         const colorList = [];
         data.map((data) => {
               const category = CategoryIcons.find((category) => category.title === data.data.name);
               colorList.push(category.color);
               return 0;
         });
         return colorList;
      }
      return d3.schemeSet3;
   };

   const colors = d3.scaleOrdinal(getColors());

   d3.select("#pie-chart")
      .select("svg")
      .remove();

   const svg = d3
      .select("#pie-chart")
      .append("svg")
      .attr("id", "chart")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2} ${height / 2})`);

   svg.append("text")
      .attr("id", "total")
      .attr("fill", "var(--color-font)")
      .attr("text-anchor", "middle")
      .text(`€ ${format(props.total)}`);

   svg.append("text")
      .attr("id", "description")
      .attr("y", "15")
      .attr("font-size", "10px")
      .attr("fill", "var(--color-grey)")
      .attr("text-anchor", "middle")
      .text("Total Amount");

   const arc = svg
      .selectAll()
      .data(createPie(data))
      .enter();

   const tooltip = d3.select("#pie-chart")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "var(--color-background")
      .style("fill", "var(--color-font)")
      .style("z-index", "100");
      
   arc.append("path")
      .attr("class", "path")
      .style("position", "relative")
      .attr("fill", (d, i) => colors(i))
      .attr("d", createArc)
      .on("mousemove", (event, d) => {
         //const [mx, my] = d3.pointer(event);
         //console.log(mx, my);

         const centroid = createArc.centroid(d);
         const svgDim = svg.node().getBoundingClientRect();
         
         const left = (centroid[0] + margin.left) * (svgDim.width / width);
         const top = (centroid[1] + margin.top) * (svgDim.height / height);
         const tooltipText = `<b>${d.data.data.name}</b><br>€ ${format(d.data.value)}<br>(${format(d.data.value / props.total * 100)}%)`;
         
         tooltip.style("top", `${top + 110}px`)
                  .style("left", `${left + 190}px`)
                  .style("display", "block")
                  .html(tooltipText);
      })
      .on("mouseout", () => { tooltip.style("display", "none")});

   
   arc.append("text")
      .attr("class", "text")
      .attr("text-anchor", (d) => {
         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
         return (midangle < Math.PI ? 'start' : 'end');
      })
      .attr("transform", function(d) {
         var pos = createOuterArc.centroid(d);
         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
         pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
         return 'translate(' + pos + ')';
      })
      //.attr('alignment-baseline', 'middle')
      .text((d) => {
         //console.log(d);
         return d.data.data.name})
      .attr("fill", "var(--color-font)")
      .attr("font-size", "8px");

   arc.append("polyline")
      .attr("stroke", "var(--color-grey)")
      .attr("fill", "none")
      .attr("stroke-width", 0.2)
      .attr("points", (d) => {
         var posA = createArc.centroid(d); // line insertion in the slice
         var posB = createOuterArc.centroid(d); // line break: we use the other arc generator that has been built only for that
         var posC = createOuterArc.centroid(d); // Label position = almost the same as posB
         var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
         posC[0] = radius * 0.9 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
         return [posA, posB, posC];
      })


   return (
      <div id="pie-chart"></div>
   );
}

export default Pie;



/*

<svg className="pie" viewBox={`0 0 ${props.width + 30} ${props.height + 30}`}>
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
