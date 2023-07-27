import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default function CategoryPieChart(props) {

  const { scheduleItems } = props;
  
  function getData() {
    const categoryData = {};
    const categoryArray = [];
    
    scheduleItems.forEach(element => {
      categoryArray.push(element.category)
    });
    console.log('category array', categoryArray)

    categoryArray.forEach(item => {
      if(categoryData[item]) {
        categoryData[item] += 1;
      } else {
        categoryData[item] = 1 ;
      }
    });

    const result = Object.entries(categoryData).map(([category, count]) => ({
      category, value: (count / categoryArray.length) * 100,
    }));
    console.log('result', result)
    return result;
  }

const pieChartData = getData(scheduleItems);
console.log('pieChartData', pieChartData)
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// let renderLabel = entry => entry.category;

return (
    <PieChart width={400} height={400} /* onMouseEnter={this.onPieEnter} */>
      <Pie
        data={pieChartData}
        label={(entry) => entry.category}
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