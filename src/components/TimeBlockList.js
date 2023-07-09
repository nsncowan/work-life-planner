import React from "react";
import TimeBlock from "./TimeBlock";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



const TimeBlockListStyle = styled.section`
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
    <TimeBlockListStyle>
        <React.Fragment>
          <hr/>
          {props.timeBlockList.map((timeBlock) =>
            <TimeBlock
              name={timeBlock.name}
              category={timeBlock.category}
              id={timeBlock.id}
              key={timeBlock.id}
            />
          )}
        </React.Fragment>
    </TimeBlockListStyle>
  );
}

TimeBlockList.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string
};

export default TimeBlockList;