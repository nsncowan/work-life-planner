import React from "react";
import { Typography } from "@mui/material";
import styled from 'styled-components';
import CategoryPieChart from "./CategoryPieChart";

const WeeklyScheduleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  align-content: top;
  justify-content: center;
  width: 100%;
  padding: .75rem;
  text-align: center;
  font-size: .833rem;
  font-weight: 500;
`;

const ScheduleColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  align-content: top;
  justify-content: top;
  max-width: 100%;
  // padding: .75rem;
  text-align: center;
  font-size: .833rem;
  font-weight: 500;
`;

  const StyledTimeSlotDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  justify-content: center;
  max-width: 12rem;
  padding: .75rem;
  margin: .15rem;
  border-radius: 54px;
  text-align: center;
  font-size: .833rem;
  transition: background-color .25s;
  border: 2px solid #FF9494;
  font-weight: 500;
  color: #FF9494;
  background-color: #FFF5E4; 
`;

export default function WeeklyView(props) {
  const { weeklySchedules } = props;
  
  return (
    <WeeklyScheduleDiv>
      {weeklySchedules.map((schedule) => (
        <ScheduleColumnDiv>
          <CategoryPieChart scheduleItems={schedule.items} />
            <Typography variant="body1">{schedule.date}</Typography>
              <ul>
                {schedule.items.map((item, index) => (
                  <StyledTimeSlotDiv>
                    <p key={index}>{item.name}</p>
                  </StyledTimeSlotDiv>
                ))}
              </ul>
        </ScheduleColumnDiv>
      ))}
    </WeeklyScheduleDiv>
  )
}