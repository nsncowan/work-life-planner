import React from "react";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import { Typography, Grid, Card, CardHeader, CardContent } from "@mui/material";
import styled from 'styled-components';

const WeeklyScheduleDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: top;
    align-content: top;
    justify-content: center;
    width: 100%;
    border: 5px solid #FF9494;
    min-width: 400px;
    min-height: 600px;
    padding: .75rem;
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
  width: 9rem;
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
  const { weeklySchedules, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;

  return (
    <WeeklyScheduleDiv>
      {weeklySchedules.map((schedule) => (
        <Grid container spacing={3}>
          <Card>
            <CardHeader title={<Typography variant="h6">{schedule.date}</Typography>} />
            <CardContent>
              <ul>
                <Grid item md={12}>
                  {schedule.items.map((item, index) => (
                    <StyledTimeSlotDiv>
                      <p key={index}>{item.name}</p>
                    </StyledTimeSlotDiv>
                  ))}
                </Grid>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </WeeklyScheduleDiv>
  )
}