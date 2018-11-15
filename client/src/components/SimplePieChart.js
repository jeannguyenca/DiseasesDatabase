import { ResponsiveContainer, PieChart, Pie, Cell } from 'Recharts';
import React from "react";

// const data = [
//  { name: 'Total', value: 300 }, 
//  { name: 'AqiUS', value: this.props.aqius }
// ];
const COLORS = ['#0088FE', '#f1f1f1'];

class AirQualityPieChart extends React.Component{
  constructor(props){
   super(props);
    this.state={
     data: [
     { name: 'Total', value: 300 },
     { name: 'AqiUS', value: this.props.aqius }
    ]
   }
  }
  

 render() {
  return (
   <ResponsiveContainer>
   <PieChart onMouseEnter={this.onPieEnter}>
    <Pie
     data={this.state.data}
     dataKey="value"
     cx="140"
     cy="70%"
     startAngle={180}
     endAngle={0}
     innerRadius={100}
     outerRadius={140}
     fill="#8884d8"
     paddingAngle={0}
    >
     {
      this.state.data.map((entry, index) => 
      <Cell 
      key={index}
      fill={COLORS[index % COLORS.length]} />)
     }
    </Pie>
   </PieChart>
   </ResponsiveContainer>
  );
 }
}

export default AirQualityPieChart; 