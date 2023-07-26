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

function AltSchedule(props) {

  const { schedule, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;

  function handleAddScheduleButtonClick(e) {
    e.preventDefault();
    addSchedule0({
      date: currentDay,
      items: [
        { id: v4(), hour: '8:00am', name: 'aaa', category: 'cat1' },
        { id: v4(), hour: '9:00am', name: 'bbb', category: 'cat2' },
        { id: v4(), hour: '10:00am', name: 'ccc', category: 'cat3' },
        { id: v4(), hour: '11:00am', name: 'ddd', category: 'cat4' },
        { id: v4(), hour: '12:00pm', name: 'eee', category: 'cat5' },
        { id: v4(), hour: '1:00pm', name: 'fff', category: 'cat6' },
        { id: v4(), hour: '2:00pm', name: 'ggg', category: 'cat7' },
        { id: v4(), hour: '3:00pm', name: 'hhh', category: 'cat8' },
        { id: v4(), hour: '4:00pm', name: 'iii', category: 'cat9' },
        { id: v4(), hour: '5:00pm', name: 'jjj', category: 'cat10' },
        { id: v4(), hour: '6:00pm', name: 'kkk', category: 'cat12' },
        { id: v4(), hour: '7:00pm', name: 'lll', category: 'cat12' },
        { id: v4(), hour: '8:00pm', name: 'mmm', category: 'cat13' },
      ]
    });
  }
  
  function handleAddScheduleButtonClick(e) {
    e.preventDefault();
    addSchedule0({
      date: currentDay,
      items: scheduleItems
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
    <React.Fragment>
      <h2>{currentDay}</h2>
      <button onClick={handleAddScheduleButtonClick}>Add Schedule</button>
      <button onClick={handleAddItemToScheduleButtonClick}>Save Schedule</button>
        {/* <h2>{scheduleToDisplay[0].date}</h2> */}
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


