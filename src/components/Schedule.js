import React from "react";
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
                  <h2>{props.date}</h2>
                    {props.schedule.map((timeSlot, index) =>
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


