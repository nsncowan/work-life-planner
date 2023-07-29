import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const StyledTimeSlotDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; xxx
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

const DeleteButton = styled.button`
padding-left: 10px;
color: #888;
font-weight: bold;
float: right;
font-size: 20px;
cursor: pointer; 

`;

function TimeSlot(props) {
  return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided, snapshot) => (
        <StyledTimeSlotDiv 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
           /* isDragging={snapshot.isDragging} */ >
            <div>
              <h6>{props.time}</h6>
              <h4>{props.name}</h4>
              <h6>{props.category}</h6>
            </div>
            {provided.placeholder}
            {/* <button onClick={props.deleteItem}>X</button> */}
        </StyledTimeSlotDiv>
      )}
    </Draggable>
  );
}

TimeSlot.propTypes = {
  time: PropTypes.string,
  key: PropTypes.string,
  content: PropTypes.array
};

export default TimeSlot;

