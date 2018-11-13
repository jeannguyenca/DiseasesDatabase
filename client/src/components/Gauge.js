import React, { Component } from 'react';
import { RadialBarChart, RadialBar } from "recharts";
import "./Gauge.css";

const data = [
 { name: 'known', uv: 6.67, pv: 4800, fill: '#f1f1f1' },
 { name: 'unknow', uv: 1, pv: 4800, fill: '#ffc658' },

];


const SimpleRadialBarChart = React.createClass({
 render() {
  return (
   <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={100} outerRadius={100} data={data} startAngle={180} endAngle={0} barSize={50} barGap={0}>
    <RadialBar minAngle={15} background clockWise={true} dataKey='uv' />
   </RadialBarChart>
  );
 }
})

export default SimpleRadialBarChart;