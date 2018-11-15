import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class SimpleLineChart extends Component{
 render() {
  return (
    <ResponsiveContainer width="100%" height="80%">
    <LineChart data={this.props.data}>
        <XAxis dataKey="year" />
        <Tooltip />
        <CartesianGrid horizontal={false} />
        <Line 
          type="monotone" 
          dataKey="cases" 
          stroke="#82ca9d" 
          activeDot={{ stroke: 'red', strokeWidth: 2, r: 4 }}/>
      </LineChart>
   </ResponsiveContainer>
   );
 }
}

export default SimpleLineChart;
