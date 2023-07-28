import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Card } from "@mui/material";
import styled from 'styled-components';

const PieChartDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    max-width: 100%;
    border: 2px solid red;
    padding: .75rem;
    text-align: center;
    font-size: .833rem;
    font-weight: 500;
  `;





export default function CategoryPieChart(props) {

  const { scheduleItems } = props;
  
  function getData() {
    const categoryData = {};
    const categoryArray = [];
    
    scheduleItems.forEach(element => {
      categoryArray.push(element.category)
    });

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
    return result;
  }

const pieChartData = getData(scheduleItems);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// let renderLabel = entry => entry.category;

return (
    <PieChartDiv>
        <PieChart width={400} height={400} /* onMouseEnter={this.onPieEnter} */>
          <Pie
            data={pieChartData}
            label={(entry) => entry.category}
            cx="60%"
            cy="50%"
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
    </PieChartDiv>
  )
}