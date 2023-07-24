import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';


const StyledScheduleDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
    padding: .77rem 0;
    text-align: center;
    font-size: .833rem;
    font-weight: 500;
  `;

function AltSchedule(props) {

  const { schedule, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;

  function handleAddScheduleButtonClick(e) {
    e.preventDefault();
    addSchedule0({
      date: currentDay,
      items: [
        { id: v4(), hour: '8:00' },
        { id: v4(), hour: '9:00' },
        { id: v4(), hour: '10:00' },
        { id: v4(), hour: '11:00' },
        { id: v4(), hour: '12:00' },
        { id: v4(), hour: '1:00' },
        { id: v4(), hour: '2:00' },
        { id: v4(), hour: '3:00' },
        { id: v4(), hour: '4:00' },
        { id: v4(), hour: '5:00' },
        { id: v4(), hour: '6:00' },
        { id: v4(), hour: '7:00' },
        { id: v4(), hour: '8:00' },
      ]
    });
  }
  
  // function handleAddScheduleButtonClick(e) {
  //   e.preventDefault();
  //   addSchedule0({
  //     date: currentDay,
  //     items: scheduleItems
  //   });
  // }
  
  function handleAddItemToScheduleButtonClick(e) {
    e.preventDefault();
    addItemToSchedule({
      id: scheduleToDisplay[0].id,
      date: scheduleToDisplay[0].date,
      items: scheduleItems
    });
  }

  

  return (
    <React.Fragment>
      <h2>{currentDay}</h2>
      <button onClick={handleAddScheduleButtonClick}>Add Schedule</button>
      <button onClick={handleAddItemToScheduleButtonClick}>Save Schedule</button>
        {/* <h2>{scheduleToDisplay[0].id}</h2> */}
        <Droppable droppableId='scheduleItems' key='scheduleItems'>
          {(provided, snapshot) => (
            <StyledScheduleDiv ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
              {scheduleItems.map((timeSlot, index) =>
                <TimeSlot time={timeSlot.hour} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index} v4={v4()}/>
              )}
              {provided.placeholder}
            </StyledScheduleDiv>
          )}
        </Droppable>
    </React.Fragment>
      
  );
}

AltSchedule.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default AltSchedule;

