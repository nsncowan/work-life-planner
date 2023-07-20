import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";

function SelectDate() {
  const [displayedDate, setDisplayedDate] = useState(new Date());
  let formattedDate = format(new Date(), 'MM-dd-yyyy');

  function advanceDate(e){
    e.preventDefault();
    const newDate = addDays(formattedDate, 1);
    setDisplayedDate(newDate);
    // return formattedDate;
  };

  return(
    <div>
      <button>back</button>
      <h3>{displayedDate}</h3>
      <button onClick={advanceDate}>forward</button>
    </div>
  );
}

export default SelectDate;