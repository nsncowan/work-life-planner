import React from "react";
import hoursOfDay from "./HoursOfDay";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';
import { v4 } from 'uuid';

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
/* 
Div 
  Hours map (hour) => {
    Droppable 
      StyledDiv
        {hour.time}
        <timeslot >
  }    
*/

function ScheduleThird(props) {
  const { schedule, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0, scheduleItems } = props;

 

  return (
    <React.Fragment>
      <div>
        {hoursOfDay.map((hour, index) => 
          <Droppable droppableId={hour.id} key={hour.id} /* type="hourDropZone" */>
            {(provided, snapshot) => (
              <StyledTimeSlotDiv ref={provided.innerRef} {...provided.droppableProps} style={{background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",}}>
                <h2>{hour.hour}</h2>
                {scheduleItems.filter((timeSlot) => {return timeSlot.time === hour.hour}).map((timeSlot, index) =>
                <TimeSlot time={timeSlot.hour} name={timeSlot.name} category={timeSlot.category} id={timeSlot.id} key={timeSlot.id} index={index} v4={v4()}/>
              )}
                {provided.placeholder}
              </StyledTimeSlotDiv>
            )}
          </Droppable>
        )}
      </div>
    </React.Fragment>
  )






}

export default ScheduleThird;