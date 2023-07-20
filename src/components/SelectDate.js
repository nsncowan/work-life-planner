import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { format, addDays, eachDayOfInterval, startOfToday, startOfMonth, endOfMonth, parseISO, parse, add} from "date-fns";

const StyledDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  width: 100%;
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

// let today = startOfToday();
// let julyArray = eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) });

// let [currentDay, setCurrentDay] = useState(format(today, 'MM-dd-yyyy'))
// console.log(currentDay);

// function nextDay() {
//   let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
//   let nextDay = addDays(newDay, 1)
//   // let nextDay = add(newDay, { days: 1}) /// THIS ALSO WORKS
//   setCurrentDay(format(nextDay, 'MM-dd-yyyy'))
// }

// const advanceDate = () => {
//   const newDate = addDays(parseISO(formattedDate), 1);
//   setDisplayedDate(newDate);
// };