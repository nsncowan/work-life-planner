import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const [dragOverId, setDragOverId] = useState(null);
  const [isDraggable, setIsDraggable] = useState(true);

  // const { className, items, itemComponent: Item } = this.props;
  // const { dragOverId, isDraggable } = this.state;

  const handleDragUpdate = ({ combine }) => {
    setDragOverId(combine ? combine?.draggableId : null)
  };

  const handleDragEnd = ({ source, combine }) => {
    if(combine) {
      const { index } = source;
      const { draggableId } = combine;
      const { onCombine } = this.props;

      onCombine(index, draggableId);
    }
    setDragOverId(null);
  };

  const checkIsDraggable = snapshot => {
    const { isDragging, draggingOver } = snapshot;

    if (isDragging && !draggingOver) {
      setIsDraggable(false);
    }
  };

  const getItemStyle = draggableStyle => {
    const { transform } = draggableStyle;
    let activeTransform = {};

    if (transform) {
      activeTransform = {
        transform: `translate(0, ${transform.substring(
          transform.indexOf(",") + 1,
          transform.indexOf(")")
        )})`
      };
    }
    return {
      userSelect: "none",
      ...draggableStyle,
      ...activeTransform
    };
  };
  

  return (
    <DragDropContext
      onDragStart={this.handleDragStart}
      onDragUpdate={this.handleDragUpdate}
      onDragEnd={this.handleDragEnd}
    >
        <Droppable droppableId="timeTable" isCombineEnabled>
          {(provided) => (
            <StyledTimeTableDiv
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <React.Fragment>
                <h2>TimeTable</h2>
                  {props.timeTable.map((timeSlot, index) =>
                    
                    <Draggable 
                    draggableId={timeSlot.id}
                    index={index}
                    isDraggable={isDraggable}>
                      {(
                      { innerRef, draggableProps, dragHandleProps },
                      snapshot
                    ) => {
                      if (isDraggable) {
                        this.checkIsDraggable(snapshot);
                      }
                      return (
                        <StyledTimeSlotDiv
                          ref={innerRef}
                          {...draggableProps}
                          {...dragHandleProps}
                          key={timeSlot.id}
                          /* className={classnames(
                            style.item,
                            snapshot.isDragging && style.itemIsDragging
                          )}
                          style={this.getItemStyle(draggableProps.style)} */
                        >
                          <TimeSlot
                          time={timeSlot.time}
                          name={timeSlot.name}
                          category={timeSlot.category}
                          id={timeSlot.id}
                          key={timeSlot.id}
                          index={index}
                          checkIsDraggable={checkIsDraggable}
                        />
                          {/* <Item
                            className={classnames(
                              dragOverId === item.id && style.draggedOver
                            )}
                            {...item}
                            index={index}
                          /> */}
                        </StyledTimeSlotDiv>
                      );
                    }}
                      

                        {/* <TimeSlot
                          time={timeSlot.time}
                          name={timeSlot.name}
                          category={timeSlot.category}
                          id={timeSlot.id}
                          key={timeSlot.id}
                          index={index}
                          checkIsDraggable={checkIsDraggable}
                        /> */}
                    
                    </Draggable>
                  )}
                  {provided.placeholder}
              </React.Fragment>
            </StyledTimeTableDiv>
          )}
        </Droppable>
    </DragDropContext>
  );
}

TimeTable.propTypes = {
  time: PropTypes.string,
  content: PropTypes.array
};

export default TimeTable;


