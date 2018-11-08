import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

class SimpleLineChart extends Component{
 render() {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <LineChart data={this.props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
      </LineChart>
   </ResponsiveContainer>
   );
 }
}

export default SimpleLineChart;
