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

function Schedule(props) {


  const { scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0 } = props;

  function handleAddScheduleButtonClick(e) {
    e.preventDefault();
    addSchedule0({
      date: currentDay,
      items: [
        { id: v4(), name: 'family time', category: 'family' },
        { id: v4(), name: 'yoga', category: 'health' },
        { id: v4(), name: 'study', category: 'education' },
        { id: v4(), name: 'relax time', category: 'self-care' },
        { id: v4(), name: 'wash dishes', category: 'chores' },
        { id: v4(), name: 'gardening', category: 'outdoor time' },
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
      {scheduleToDisplay?.map((entry, index) =>
        <StyledScheduleDiv>
          {/* <h2>{entry.date}</h2> */}
          <Droppable droppableId='schedule' key='schedule'>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
                {entry.items.map((timeSlot, index) =>
                  <TimeSlot time={timeSlot.time} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index}/>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </StyledScheduleDiv>
      )}
    </React.Fragment>
      
  );
}

Schedule.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default Schedule;


