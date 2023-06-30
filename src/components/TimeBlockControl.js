import React, { useState } from "react";
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


function TimeBlockControl() {
  // data state slices
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(false);
  
  // display state slices
  const [selectedTimeBlock, setSelectedTimeBlock] = useState(null);
  const [formVisible, setFormVisible] = useState(false);


  const addTimeBlock0 = async (timeBlock) => {
    await addDoc(collection(db, "timeBlocks"), timeBlock);
  }



  let currentState = null;
  let topTaskBar = <PlannerViewSelector />;
  let bottomTaskBar = <BottomTaskBar />;
  

  if(formVisible) {
    currentState = <NewTimeBlockForm addTimeBlock1 = {addTimeBlock0} />;
  }


  else {
    currentState = <TimeBlockList />;
  }

  return (
    <React.Fragment>
      {topTaskBar}
      {currentState}
      {bottomTaskBar}
    </React.Fragment>
  );











}

export default TimeBlockControl;