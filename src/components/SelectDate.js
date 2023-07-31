import React from "react";
import styled from 'styled-components';

const StyledDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  `;

function SelectDate(props) {
  return(
    <StyledDateDiv>
      <button type="button" id="previousDay" onClick={props.prevDay}>back</button>
      <h4>{props.currentDay}</h4>
      <button type="button" id="nextDay" onClick={props.nextDay}>forward</button>
    </StyledDateDiv>
  );
}

export default SelectDate;