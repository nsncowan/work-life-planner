import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";
import { DragDropContext } from "react-beautiful-dnd";
import initialDayData from "./initial-day-data";
import DayView from "./DayView";

const StyledMainBodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  width: 100%;
  `;

function TimeBlockControl() {
  // data state slices
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [timeTable, setTimeTable] = useState(initialDayData);
  const [editing, setEditing] = useState(false);
  
  // display state slices
  const [viewSelector, setViewSelector] = useState('timeBlockList');
  const [displayedDate, setDisplayedDate] = useState(/* default date obj is today's date */)
  const [formVisible, setFormVisible] = useState(false);

  // display the list of timeBlocks
  useEffect(() => {
    const unSubscribeTimeBlocks = onSnapshot(
      collection(db, "timeBlocks"),
      (collectionSnapshot) => {
        const timeBlocks = [];
        collectionSnapshot.forEach((doc) => {
          timeBlocks.push({
            name: doc.data().name,
            category: doc.data().category,
            // add key property set to id for help with dnd
            id: doc.id
          });
        });
        setTimeBlockList(timeBlocks);
      },
      // (error) => {}
    );

    const unSubscribeCategory = onSnapshot(
      collection(db, "categories"),
      (collectionSnapshot) => {
        const categories = [];
        collectionSnapshot.forEach((doc) => {
          categories.push({
            name: doc.data().name,
            id: doc.id
          });
        });
        setCategoryList(categories);
      },
      // (error) => {}
    );

    const initialize = () => {
      unSubscribeTimeBlocks();
      unSubscribeCategory();
    }
    return initialize;
  }, []);

  // handles button click to toggle between TimeBlockList and NewTimeBlockForm
  const handleClick = () => {
    formVisible ? setFormVisible(false) : setFormVisible(true);
  }


  // adds timeBlock to db
  const addTimeBlock0 = async (timeBlock) => {
    const collectionReference = collection(db, "timeBlocks");
    await addDoc(collectionReference, timeBlock);
  }

  // adds category to db
  const addCategory0 = async (category) => {
    await addDoc(collection(db, "categories"), category);
  }

  const rearrangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);
    return arrCopy;
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if(!destination) return;
    if(destination.droppableId === 'timeTable') {
      console.log(source);
      console.log(destination);
      setTimeTable(rearrangeArr(timeTable, source.index, destination.index));
    }
    else {
      const newTimeBlockList = Array.from(timeBlockList);
      const [draggedTimeBlock] = newTimeBlockList.splice(source.index, 1);
      newTimeBlockList.splice(destination.index, 0, draggedTimeBlock);
      setTimeBlockList(newTimeBlockList);
      // do I need to update the order in firestore???
    }
  }



  let currentState = null;
  let otherCurrentState = null;
  let buttonOne = null;
  let topTaskBar = <PlannerViewSelector />;
  // let bottomTaskBar = <BottomTaskBar />;
  

  if(formVisible) {
    currentState = <NewTimeBlockForm 
                      addTimeBlock1 = {addTimeBlock0}
                      categoryList = {categoryList} />;
    otherCurrentState = <NewCategoryForm
                      addCategory1={addCategory0} />;
    buttonOne = 'back to timeblock list'
  }


  else {
    currentState = <TimeBlockList timeBlockList={timeBlockList}/>;
    otherCurrentState = <DayView timeTable={timeTable} />
    buttonOne = 'go to timeblock form';
  }

  return (
    <React.Fragment>
      {topTaskBar}
      <StyledMainBodyDiv>
        <DragDropContext onDragEnd={onDragEnd}>
          {currentState}
          {otherCurrentState}
        </DragDropContext>
          <button onClick={handleClick}>{buttonOne}</button>
      </StyledMainBodyDiv>
      {/* {bottomTaskBar} */}
    </React.Fragment>
  );





}

export default TimeBlockControl;