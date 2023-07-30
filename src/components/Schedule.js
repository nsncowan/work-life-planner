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
   /*  border: 2px solid #FF9494; */
    min-width: 400px;
    min-height: 600px;
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
        { id: v4(), name: 'family time', category: 'family' },
        { id: v4(), name: 'yoga', category: 'health' },
        { id: v4(), name: 'study', category: 'education' },
        { id: v4(), name: 'relax time', category: 'Self-care' },
        { id: v4(), name: 'wash dishes', category: 'chores' },
        { id: v4(), name: 'gardening', category: 'outdoor time' },
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
          {/* <ScheduleBodyDiv> */}
            <Grid item md={12}>
                {currentDay}
            </Grid>
            <Grid item md={12}>
              <button onClick={handleAddScheduleButtonClick}>Add Schedule</button>
              <button onClick={handleAddItemToScheduleButtonClick}>Save Schedule</button>
            </Grid>
            <Grid item md={12}>
              <CategoryPieChart scheduleItems={scheduleItems} />
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
                          deleteScheduleItems={deleteScheduleItems} />
                          )}
                      {provided.placeholder}
                  </StyledScheduleDiv>
                )}
              </Droppable>
          {/* </ScheduleBodyDiv> */}
        </Grid>
      </React.Fragment>
    </ScheduleBodyDiv>
      
  );
}


export default Schedule;


