import React from "react";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import { Typography, Grid, Card, CardHeader, CardContent, CardMedia } from "@mui/material";
import styled from 'styled-components';
import CategoryPieChart from "./CategoryPieChart";

const WeeklyScheduleDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: top;
    align-content: top;
    justify-content: center;
    width: 100%;
    border: 2px solid red;
    padding: .75rem;
    text-align: center;
    font-size: .833rem;
    font-weight: 500;
  `;

  const ScheduleColumnDiv = styled.div`
  /* align-items: top;
  display: flex;
  flex-direction: column;
    align-content: top;
    justify-content: top;
    max-width: 100%;
    padding: .75rem;
    text-align: center;
    font-size: .833rem;
    font-weight: 500;
    border: 2px dotted blue; */

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
  const { weeklySchedules, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;


  function GetItemArray(schedule) {
    const items = schedule.map((entry) => {
      return entry.items;
    });
    const scheduleItems = [];
    items.forEach((item) => {
      scheduleItems.push(item);
      return scheduleItems;
  });
  }

  return (
    <WeeklyScheduleDiv>
      {weeklySchedules.map((schedule) => (
        <ScheduleColumnDiv>
            <Typography variant="h6">{schedule.date}</Typography>
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


  // return (
  //   <WeeklyScheduleDiv>
  //     {weeklySchedules.map((schedule) => (
  //       <Grid container spacing={3}>
  //         <Card>
  //           <CardHeader title={<Typography variant="h6">{schedule.date}</Typography>} />
  //           <CardContent>
  //             <ul>
  //               <Grid item md={12}>
  //                 {schedule.items.map((item, index) => (
  //                   <StyledTimeSlotDiv>
  //                     <p key={index}>{item.name}</p>
  //                   </StyledTimeSlotDiv>
  //                 ))}
  //               </Grid>
  //             </ul>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     ))}
  //   </WeeklyScheduleDiv>
  // )
}