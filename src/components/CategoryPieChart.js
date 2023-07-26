import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function CategoryPieChart(props) {

  const { scheduleItems } = props;
  
  function getData(arr) {
    const categoryData = {};
    const categoryArray = [];
    
    scheduleItems.forEach(element => {
      categoryArray.push(element.category)
    });

    categoryArray.forEach(item => {
      if(categoryData[item]) {
        categoryData[item] += 1;
      } else {
        categoryData[item] = { category: item, value: 1 };
      }
    });

    const result = Object.values(categoryData);
    return result;
  }

const pieChartData = getData(scheduleItems);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

return (
    <PieChart width={300} height={300} /* onMouseEnter={this.onPieEnter} */>
      <Pie
        data={pieChartData}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}