import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

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
    color: #FFF5E4;
    background-color: #FF9494;
    font-weight: 500;
    cursor: pointer;
  `;

export default function TimeSlot(props) {
  return (
    <StyledTimeSlotDiv>
      <h5>{props.timeSlot}</h5>
      <h6>{props.content}</h6>
    </StyledTimeSlotDiv>
  );
}

