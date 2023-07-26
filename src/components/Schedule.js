import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import hoursOfDay from "./HoursOfDay";


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

const StyledTimeSlotDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  justify-content: center;
  width: 15rem;
  padding: .75rem;
  margin: .15rem;
  border-radius: 54px;
  text-align: center;
  font-size: .833rem;
  transition: background-color .25s;
  border: 2px solid #FF9494;
  font-weight: 500;
  cursor: pointer;
  color: #FF9494;
  background-color: #FFF5E4;
`;


function Schedule(props) {


  const { schedule, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;

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
      <Droppable droppableId='8:00am' key='8:00am'>
        {(provided, snapshot) => (
          <StyledTimeSlotDiv ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
            <h2>8:00am</h2>
            {scheduleItems?.filter(timeSlot => timeSlot.hour === '8:00am').map((timeSlot, index) =>
              <TimeSlot time={timeSlot.hour} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index} v4={v4()}/>
            )}
            {provided.placeholder}
          </StyledTimeSlotDiv>
        )}
      </Droppable>

    </React.Fragment>
      
  );
}

Schedule.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default Schedule;


