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

// function DayView(props) {
//   return (
//     <Droppable droppableId="timeTable" isCombineEnabled>
//       {provided => (
//         <StyledDayViewDiv ref={provided.innerRef} {...provided.droppableProps}>
//           <React.Fragment>
//             <h2>Day View</h2>
//             <StyledTimeSlotDiv>12:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>1:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>2:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>3:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>4:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>5:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>6:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>7:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>8:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>9:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>10:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>11:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>12:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>1:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>2:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>3:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>4:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>5:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>6:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>7:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>8:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>9:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>10:00</StyledTimeSlotDiv>
//             <StyledTimeSlotDiv>11:00</StyledTimeSlotDiv>
//           </React.Fragment>
//         </StyledDayViewDiv>
//       )}
//     </Droppable>
//   );
// }

function DayView(props) {
  return (
    <Droppable droppableId="timeTable" isCombineEnabled>
      {provided => (
        <StyledDayViewDiv ref={provided.innerRef} {...provided.droppableProps}>
          <React.Fragment>
            <h2>Day View</h2>
              {props.timeTable.map((timeSlot, index) =>
                <TimeSlot
                  time={timeSlot.time}
                  content={timeSlot.content}
                  id={timeSlot.id}
                  key={timeSlot.id}
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


