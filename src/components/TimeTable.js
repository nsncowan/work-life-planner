import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';

const StyledTimeTableDiv = styled.div`
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

function TimeTable(props) {
  return (
    <Droppable droppableId="timeTable" isCombineEnabled>
      {(provided, snapshot) => (
        <StyledTimeTableDiv 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
          <React.Fragment>
            <h2>TimeTable</h2>
              {props.timeTable.map((timeSlot, index) =>
                <TimeSlot
                  time={timeSlot.time}
                  name={timeSlot.name}
                  category={timeSlot.category}
                  id={timeSlot.id}
                  key={timeSlot.id}
                  index={index}
                />
              )}
              {provided.placeholder}
          </React.Fragment>
        </StyledTimeTableDiv>
      )}
    </Droppable>
  );
}

TimeTable.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default TimeTable;

