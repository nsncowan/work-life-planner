import React, { useState } from "react";
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


function TimeBlockControl() {
  // data state slices
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [editing, setEditing] = useState(false);
  
  // display state slices
  const [viewSelector, setViewSelector] = useState('timeBlockList');
  const [displayedDate, setDisplayedDate] = useState(/* default date obj is today's date */)
  const [formVisible, setFormVisible] = useState(false);

  // handles button click to toggle between TimeBlockList and NewTimeBlockForm
  const handleClick = () => {
    formVisible ? setFormVisible(false) : setFormVisible(true);
  }

  // adds timeBlock to db
  const addTimeBlock0 = async (timeBlock) => {
    await addDoc(collection(db, "timeBlocks"), timeBlock);
  }

  // adds category to db
  const addCategory0 = async (category) => {
    await addDoc(collection(db, "categories"), category);
  }



  let currentState = null;
  let buttonText = null;
  let topTaskBar = <PlannerViewSelector />;
  // let bottomTaskBar = <BottomTaskBar />;
  

  if(formVisible) {
    currentState = <NewTimeBlockForm 
                      addTimeBlock1 = {addTimeBlock0}
                      addCategory1={addCategory0} />;
    buttonText = 'back to timeblock list'
  }


  else {
    currentState = <TimeBlockList />;
    buttonText = 'go to timeblock form'
  }

  return (
    <React.Fragment>
      {topTaskBar}
      {currentState}
      {<button onClick={handleClick}>{buttonText}</button>}
      {/* {bottomTaskBar} */}
    </React.Fragment>
  );











}

export default TimeBlockControl;