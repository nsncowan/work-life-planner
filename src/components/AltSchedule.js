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
        { name: 'family time', category: 'family' },
        { name: 'yoga', category: 'health' },
        { name: 'study', category: 'education' },
        { name: 'relax time', category: 'self-care' },
        { name: 'wash dishes', category: 'chores' },
        { name: 'gardening', category: 'outdoor time' },
      ]
    });
  }
  
  function handleAddItemToScheduleButtonClick(e) {
    e.preventDefault();
    addItemToSchedule();
  }

  return (
    <React.Fragment>
      <h2>{currentDay}</h2>
      <button onClick={handleAddScheduleButtonClick}>addSchedule0</button>
      <button onClick={handleAddItemToScheduleButtonClick}>addItemToSchedule</button>
        {/* <h2>{scheduleToDisplay.date}</h2> */}
        <Droppable droppableId='schedule' key='schedule'>
          {(provided, snapshot) => (
            <StyledScheduleDiv ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
              {scheduleItems.map((timeSlot, index) =>
                <TimeSlot time={timeSlot.time} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index} v4={v4()}/>
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


