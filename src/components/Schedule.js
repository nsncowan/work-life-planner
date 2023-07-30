import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import CategoryPieChart from "./CategoryPieChart";
import Grid from "@mui/system/Unstable_Grid/Grid";

const StyledScheduleDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
    // border: 2px solid #FF9494;
    min-height: 100px;
    padding: .77rem 0;
    text-align: center;
    font-size: .833rem;
    font-weight: 500;
  `;

  const ScheduleBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  font-size: .833rem;
  transition: background-color .25s;
  font-weight: 500;
  cursor: pointer;
  color: #FF9494;
  background-color: #FFF5E4;
`;

function Schedule(props) {

  const { deleteScheduleItems, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule, scheduleItems } = props;

  function handleAddScheduleButtonClick(e) {
    e.preventDefault();
    addSchedule({
      date: currentDay,
      items: [
        { id: v4(), name: 'Start Your Day Here', category: 'Other' },
       ]
    });
  }
    
  function handleAddItemToScheduleButtonClick(e) {
    e.preventDefault();
    addItemToSchedule({
      id: scheduleToDisplay[0].id,
      date: scheduleToDisplay[0].date,
      items: scheduleItems
    });
  }

  return (
    <ScheduleBodyDiv>
      <React.Fragment>
        <Grid container>
          {/* <Grid item md={12}>
              {currentDay}
          </Grid> */}
          <Grid item md={12}>
            <CategoryPieChart scheduleItems={scheduleItems} />
          </Grid>
          <Grid item md={12}>
            {/* <button onClick={handleAddScheduleButtonClick}>Add Schedule</button> */}
            <button onClick={handleAddItemToScheduleButtonClick}>Save Schedule</button>
          </Grid>
          <Droppable droppableId='scheduleItems' key='scheduleItems'>
            {(provided, snapshot) => (
              <StyledScheduleDiv ref={provided.innerRef} {...provided.droppableProps} >
                {scheduleItems.map((timeSlot, index) =>
                  <TimeSlot
                    name={timeSlot.name}
                    category={timeSlot.category}
                    id={timeSlot.id}
                    key={timeSlot.id}
                    index={index}
                    deleteScheduleItems={deleteScheduleItems} 
                  />
                )}
                {provided.placeholder}
              </StyledScheduleDiv>
            )}
          </Droppable>
        </Grid>
      </React.Fragment>
    </ScheduleBodyDiv>
      
  );
}


export default Schedule;


