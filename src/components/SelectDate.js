import React, { useEffect, useState } from "react";
import { format, addDays, eachDayOfInterval, startOfToday, startOfMonth, endOfMonth, parseISO, parse, add} from "date-fns";

function SelectDate() {
  // console.log('today: ', today);
  // console.log('julyArray: ', julyArray);
  
  
  let today = startOfToday();
  const [displayedDate, setDisplayedDate] = useState(today);
  let julyArray = eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) });
  let formattedDate = format(today, 'MM-dd-yyyy');
  
  let [currentDay, setCurrentDay] = useState(format(today, 'MM-dd-yyyy'))
  console.log(currentDay);

  function nextDay() {
    let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
    let nextDay = add(newDay, { days: 1})
    setCurrentDay(format(nextDay, 'MM-dd-yyyy'))
  }
  
  
  // console.log('formattedDate: ', formattedDate);
  // console.log('displayedDate: ', displayedDate);

  // const advanceDate = () => {
  //   const newDate = addDays(parseISO(formattedDate), 1);
  //   setDisplayedDate(newDate);
  // };

  return(
    <div>
      <button type="button">back</button>
      <h3>{currentDay}</h3>
      <button type="button" onClick={nextDay}>forward</button>
    </div>
  );
}

export default SelectDate;