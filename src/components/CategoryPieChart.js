import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Label } from 'recharts';
import { Card } from "@mui/material";
import styled from 'styled-components';
import Box from "@mui/material";

const PieChartDiv = styled.div`
  margin: 1rem
  font-size: .5rem;
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

  const calculateLabelPosition = (entry, outerRadius, innerRadius, cx, cy) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2; // You can adjust the multiplier as needed
    const x = cx + radius * Math.cos(-entry.midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-entry.midAngle * (Math.PI / 180));
    return { x, y };
  };

const pieChartData = getData(scheduleItems);
const COLORS = ['#F6114A', '#0AA0BF', '#F36E98', '#78B177', '#9862A2', '#F05006', '#25998F', '#FCA00C'];
// let renderLabel = entry => entry.category;

return (
    <PieChartDiv>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart width="100%" height="100%" margin={{ top: 0, right: 5, bottom: 0, left: 5 }}>
          <Pie
            data={pieChartData}
            label={(entry) => entry.category}
            labelLine={true}
            cx="50%"
            cy="50%"
            innerRadius='0%'
            outerRadius='45%'
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {/* {pieChartData.map((entry, index) => (
              <Label
              key={`label-${entry}`}
              position="outside"
              offset={1}
              dx={10}
              dy={-5}
              angle={entry.midAngle}
              fill="#8884d8"
              >
              {entry.category}
            </Label>
          ))} */}
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        </PieChart>
      </ResponsiveContainer>
    </PieChartDiv>
  )
}