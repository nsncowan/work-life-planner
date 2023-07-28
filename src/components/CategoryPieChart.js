import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Card } from "@mui/material";
import styled from 'styled-components';

const PieChartDiv = styled.div`
    height: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    max-width: 100%;
    /* border: 2px solid red; */
    padding: 0rem;
    text-align: center;
    font-size: .7rem;
    font-weight: 400;
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
const COLORS = ['#F6114A', '#0AA0BF', '#F36E98', '#78B177', '#9862A2', '#F05006', '#25998F', '#FCA00C'];
// let renderLabel = entry => entry.category;

return (
    <PieChartDiv>
      <ResponsiveContainer width="80%" height="80%">
        <PieChart width={800} height={800} margin={{ top: 10, right: 10, bottom: 10, left: 10 }} >
          <Pie
            data={pieChartData}
            label={(entry) => entry.category}
            cx="50%"
            cy="50%"
            innerRadius='75%'
            outerRadius='100%'
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </PieChartDiv>
  )
}