import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import TimeSlot from "./TimeSlot";

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
    <StyledDayViewDiv>
      <React.Fragment>
        <h2>Day View</h2>
          {props.timeTable.map((timeSlot) =>
            <TimeSlot
              time={timeSlot.time}
              content={timeSlot.content}
            />
            )}
      </React.Fragment>
    </StyledDayViewDiv>
  )
};

DayView.propTypes = {
  time: PropTypes.string,
  content: PropTypes.object
};

export default DayView;
