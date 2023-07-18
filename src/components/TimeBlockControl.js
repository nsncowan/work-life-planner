import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { initialDayData, initialTimeBlocks } from "./initial-day-data";
import TimeTable from "./TimeTable";
import TimeSlot from "./TimeSlot";

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const combine = (origin, destiny) => ({
    id: destiny.id,
    time: `${destiny.time}`,
    name: `${origin.name}`,
    category: `${origin.category}`,
  });
  
  const handleCombine = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
      const combinedItem = combine(droppableSource.index, droppableDestination.index)
      destClone.splice(droppableDestination.index, 0, combinedItem);
  
      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
  
      return result;
    };

  const handleCombine2 = (source, destination, originPos, destinyId) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const origin = sourceClone[originPos];
    const destinyPos = destClone.findIndex(({ id }) => id === destinyId);
    const destiny = destClone[destinyPos];
    const combinedItem = combine(origin, destiny);
    destClone.splice(destinyPos, 1, combinedItem);
    sourceClone.splice(originPos, 1);
    console.log(sourceClone);
    console.log(destClone);

    setTimeBlockList(sourceClone);
    setTimeTable(destClone);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId, combine } = result;

    if(!destination) return;
    
    if(source.droppableId === 'timeTable' && destination.droppableId === 'timeTable') {
      setTimeTable(reorder(timeTable, source.index, destination.index));
    }
    else if (source.droppableId === 'timeBlockList' && destination.droppableId === 'timeBlockList') {
      setTimeBlockList(reorder(timeBlockList, source.index, destination.index));
    }
    else if(combine) {
      handleCombine2(
        timeBlockList,
        timeTable,
        source,
        destination
      );
    }
    else {
      const result = move(
        timeBlockList,
        timeTable,
        source,
        destination
      );
      setTimeBlockList(result.timeBlockList)
      setTimeTable(result.timeTable)
    };
    console.log(timeBlockList);
    console.log(timeTable);
    console.log(result);
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
    otherCurrentState = <TimeTable timeTable={timeTable} />
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
