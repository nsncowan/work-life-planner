import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { v4 } from 'uuid';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db } from "../firebase";
import { collection, doc, addDoc, onSnapshot, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc, query, where } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { initialDayData, initialTimeBlocks, dayColumns } from "./initial-day-data";
import Schedule from "./Schedule";
import AltSchedule from "./AltSchedule";
import TimeSlot from "./TimeSlot";
import SelectDate from "./SelectDate";
import { format, addDays, eachDayOfInterval, startOfToday, startOfMonth, endOfMonth, parseISO, parse, add, subDays} from "date-fns";


const StyledMainBodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  width: 100%;
  `;

function TimeBlockControl() {
  let today = startOfToday();
  const [currentDay, setCurrentDay] = useState(format(today, 'MM-dd-yyyy'))
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [scheduleToDisplay, setScheduleToDisplay] = useState([]);
  const [editing, setEditing] = useState(false);
  const [viewSelector, setViewSelector] = useState('timeBlockList');
  const [formVisible, setFormVisible] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([]);
  
// ==================================== DATE LOGIC ================================================

  function nextDay() {
    let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
    let nextDay = addDays(newDay, 1)
    // let nextDay = add(newDay, { days: 1}) /// THIS ALSO WORKS
    setCurrentDay(format(nextDay, 'MM-dd-yyyy'))
    // setDisplayCurrentSchedule(getScheduleToDisplay(schedule));
  }
  
  function prevDay() {
    let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
    let nextDay = subDays(newDay, 1)
    // let nextDay = add(newDay, { days: 1}) /// THIS ALSO WORKS
    setCurrentDay(format(nextDay, 'MM-dd-yyyy'))
  }
// ================================================================================================

// ================================================================================================
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
        console.log('timeblocks: ', timeBlocks);
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
            
    // const ref = collection(db, "schedules");
    // const q = query(ref, where("date", "==", currentDay));
    // const findSchedule = 
    //     onSnapshot(q,(snapshot) => {
    //       const scheduleToDisplay = [];
    //       snapshot.docs.forEach((doc) => {
    //         scheduleToDisplay.push({
    //           id: doc.id,
    //           date: doc.data().date,
    //           items: doc.data().items,
    //         });
    //       });
    //       console.log("scheduleToDisplay : ", scheduleToDisplay);
    //       setScheduleToDisplay(scheduleToDisplay);

    //       const items = scheduleToDisplay.map((entry) => {
    //         return entry.items;
    //       });
    //       const scheduleItems = [];
    //       items.forEach((item) => {
    //         scheduleItems.push(item);
    //       });
    //       setScheduleItems(scheduleItems.flat(2));
    //       console.log('scheduleItems: ', scheduleItems);
    //     },
    //   );

    const initialize = () => {
      unSubscribeTimeBlocks();
      unSubscribeCategory();
      // findSchedule();
    }
    return initialize;
  }, []);

  useEffect(() => {
    const ref = collection(db, "schedules");
    const q = query(ref, where("date", "==", currentDay));
    const findSchedule = 
        onSnapshot(q,(snapshot) => {
          const scheduleToDisplay = [];
          snapshot.docs.forEach((doc) => {
            scheduleToDisplay.push({
              id: doc.id,
              date: doc.data().date,
              items: doc.data().items,
            });
          });
          setScheduleToDisplay(scheduleToDisplay);

          const items = scheduleToDisplay.map((entry) => {
            return entry.items;
          });
          const scheduleItems = [];
          items.forEach((item) => {
            scheduleItems.push(item);
          });
          setScheduleItems(scheduleItems.flat());
        },
        // (error) => {}
        );
    return () => findSchedule();
  }, [currentDay, /* scheduleItems */])
// ================================================================================================

const handleClick = () => {
    formVisible ? setFormVisible(false) : setFormVisible(true);
  }

// ====================================== DATABASE LOGIC ==========================================
  const addTimeBlock0 = async (timeBlock) => {
    const collectionReference = collection(db, "timeBlocks");
    await addDoc(collectionReference, timeBlock);
  }

  const addCategory0 = async (category) => {
    await addDoc(collection(db, "categories"), category);
  }
  
  const addSchedule0 = async (schedule) => {
    await addDoc(collection(db, "schedules"), schedule);
  }

  // const addItemToSchedule = async (item, currentScheduleId) => {
  //   const reference = doc(db, "schedules", currentScheduleId)
  //   await updateDoc(reference, {
  //     items: arrayUnion(item)
  //   });
  // }

  const addItemToSchedule = async (scheduleToEdit) => {
    const docRef = doc(db, "schedules", scheduleToEdit.id);
    await updateDoc(docRef, scheduleToEdit);
  }

  // const addItemToSchedule = async (schedule) => {
  //   await setDoc(collection(db, "schedules"), schedule);
  // }

  // const getScheduleToDisplay = (schedules) => {
  //   const scheduleItemsToDisplay = [];
  //   const targetSchedule = schedule.find(({ date }) => date === currentDay);
  //   targetSchedule.items.forEach((item) => {
  //     scheduleItemsToDisplay.push(item);
  //   });
  //   return scheduleItemsToDisplay;
  // };
// ================================================================================================

// ====================================== DRAG AND DROP LOGIC =====================================

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
    // const copyItem = sourceClone[droppableSource.index];
    const removedWithNewId = { ...removed, id: v4() };
    destClone.splice(droppableDestination.index, 0, removedWithNewId); // replaces the dragged timeBlock with a copy (and assigns a new id in the process)
    sourceClone.splice(droppableSource.index, 0, removed); 
        
    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone,
      removedItem: removedWithNewId
    };
  };

  const onDragEnd = (result) => {
    const { source, destination, } = result;

    if(!destination) return;
    
    if(source.droppableId === 'scheduleItems' && destination.droppableId === 'scheduleItems') {
      setScheduleItems(reorder(scheduleItems, source.index, destination.index));
    }
    else if (source.droppableId === 'timeBlockList' && destination.droppableId === 'timeBlockList') {
      setTimeBlockList(reorder(timeBlockList, source.index, destination.index));
    }
    else {
      const result = move(timeBlockList, scheduleItems, source, destination);
      setTimeBlockList(result.timeBlockList)
      addItemToSchedule({
        id: scheduleToDisplay[0].id,
        date: scheduleToDisplay[0].date,
        items: scheduleItems
      });
      setScheduleItems(result.scheduleItems)
      // setScheduleToDisplay(scheduleToDisplay)
    };
    console.log('scheduleItems onDragEnd: ', scheduleItems)
    console.log('scheduleToDisplay[0] onDragEnd: ', scheduleToDisplay[0])
  }
  
  let currentState = null;
  let otherCurrentState = null;
  let dateDisplay = <SelectDate currentDay={currentDay} nextDay={nextDay} prevDay={prevDay} />;
  let buttonOne = null;
  let topTaskBar = <PlannerViewSelector />;  
  
  if(formVisible) {
    currentState = <NewTimeBlockForm 
    addTimeBlock1 = {addTimeBlock0}
    categoryList = {categoryList} />;
    otherCurrentState = <NewCategoryForm
    addCategory1={addCategory0} />;
    buttonOne = 'back to timeblock list'
  }
  
  else {
    currentState = <TimeBlockList timeBlockList={timeBlockList} />;
    // otherCurrentState = <Schedule 
    //                       scheduleToDisplay={scheduleToDisplay} 
    //                       addItemToSchedule={addItemToSchedule} 
    //                       addSchedule0={addSchedule0}
    //                       currentDay={currentDay}
    //                        />;
    otherCurrentState = <AltSchedule 
                          //  schedule={schedule}
                           scheduleToDisplay={scheduleToDisplay} 
                           addItemToSchedule={addItemToSchedule} 
                           addSchedule0={addSchedule0}
                           currentDay={currentDay}
                           scheduleItems={scheduleItems}
                            />;
    buttonOne = 'go to timeblock form';
  }
  
  return (
    <React.Fragment>
      {topTaskBar}
      <StyledMainBodyDiv>
      {/* {console.log('schedule', schedule)}
      {console.log('displayCurrentSchedule', displayCurrentSchedule)} */}
        <DragDropContext onDragEnd={onDragEnd}>
          {dateDisplay}
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
