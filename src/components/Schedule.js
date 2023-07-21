import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';


const StyledScheduleeDiv = styled.div`
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
  width: 9rem;
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


  const { schedule, scheduleToDisplay, currentDay, addItemToSchedule, addSchedule0 } = props;
  // const scheduleToDisplay = schedule.find(({ date }) => date === currentDay);
  // const itemsToDisplay = scheduleToDisplay.items;
  // const itemsToMap = scheduleToDisplay.items;
  

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

/* 
create a func to set currentSchedule to a particular date
use buttons to run function to set currentSchedule
pass currentSchedule into component to map through items
*/

  return (
    // <div style={{
    //   display: "flex",
    //   flexDirection: "row",
    //   alignItems: "center"
    // }}>
    //   {Object.entries(dayColumns).map(([dayColumnId, dayColumn], index) => {
    //     return (
          <Droppable droppableId='schedule' key='schedule'>
            {(provided, snapshot) => (
              <StyledScheduleeDiv
              ref={provided.innerRef}
              {...provided.droppableProps}
              /* draggingOver={snapshot.draggingOver} */>
                <React.Fragment>
                  <h2>{currentDay}</h2>
                  <button onClick={handleAddScheduleButtonClick}>addSchedule0</button>
                  <button onClick={handleAddItemToScheduleButtonClick}>addItemToSchedule</button>
                    {schedule.map((timeSlot, index) =>
                      <TimeSlot
                      time={timeSlot.time}
                      date={timeSlot.date}
                      items={timeSlot.items}
                      name={timeSlot.name}
                      category={timeSlot.category}
                      id={timeSlot.id}
                      key={timeSlot.id}
                      index={index}
                      />
                      )}
                      {provided.placeholder}
                </React.Fragment>
              </StyledScheduleeDiv>
            )}
          </Droppable>
      //     )
      //   })};
      // </div>
  );
}

Schedule.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default Schedule;


