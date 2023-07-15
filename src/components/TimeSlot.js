import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const StyledTimeSlotDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-around;
    justify-content: center;
    width: 8.11rem;
    padding: .77rem;
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

function TimeSlot(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => (
        <StyledTimeSlotDiv 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
          <h5>{props.time}</h5>
          <h6>{props.content}</h6>
        </StyledTimeSlotDiv>
      )}
    </Draggable>
  );
}

TimeSlot.propTypes = {
  time: PropTypes.string,
  content: PropTypes.object
};

export default TimeSlot;

