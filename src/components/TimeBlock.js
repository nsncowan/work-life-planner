import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const TimeBlockStyle = styled.div`
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
    color: #FFF5E4;
    background-color: #FF9494;
    font-weight: 500;
    cursor: pointer;
  `;

function TimeBlock(props) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => (
        <TimeBlockStyle
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
            <h4>{props.name}</h4>
            <h6>{props.category}</h6>
        </TimeBlockStyle>
      )}
    </Draggable>
  );
}

TimeBlock.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string
};

export default TimeBlock;