import React from "react";
import TimeBlock from "./TimeBlock";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const StyledTimeBlockDiv = styled.div`
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

  
  
function TimeBlockList(props) {
  
  
  return (
  <Droppable droppableId="timeBlockList" key="timeBlockList">
    {(provided, snapshot) => (
      <StyledTimeBlockDiv 
        ref={provided.innerRef} 
        {...provided.droppableProps}
        /* isDraggingOver={snapshot.isDraggingOver} */>
        <React.Fragment>
          <hr/>
          {props.timeBlockList.map((timeBlock, index) =>
            <TimeBlock
              name={timeBlock.name}
              category={timeBlock.category}
              id={timeBlock.id}
              key={timeBlock.id}
              index={index}
            />
          )}
          {provided.placeholder}
        </React.Fragment>
      </StyledTimeBlockDiv>
    )}
  </Droppable>
  );
}

TimeBlockList.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string
};

export default TimeBlockList;
