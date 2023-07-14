import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { Droppable } from 'react-beautiful-dnd';

const StyledDayViewDiv = styled.div`
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

function DayView(props) {
  return (
    <Droppable droppableId="timeTable">
      {provided => (
        <StyledDayViewDiv ref={provided.innerRef} {...provided.droppableProps}>
          <React.Fragment>
            <h2>Day View</h2>
              {props.timeTable.map((timeSlot, index) =>
                <TimeSlot
                  time={timeSlot.time}
                  content={timeSlot.content}
                  index={index}
                />
              )}
              {provided.placeholder}
          </React.Fragment>
        </StyledDayViewDiv>
      )}
    </Droppable>
  );
}

DayView.propTypes = {
  time: PropTypes.string,
  content: PropTypes.object
};

export default DayView;
