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
  const [displayCurrentSchedule, setDisplayCurrentSchedule] = useState();
  const [editing, setEditing] = useState(false);
  const [viewSelector, setViewSelector] = useState('timeBlockList');
  const [formVisible, setFormVisible] = useState(false);

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

        // const findSchedule = async () => {
        //   const scheduleToDisplay = [];
          const ref = collection(db, "schedules");
          const q = query(ref, where("date", "==", currentDay));
        //   const querySnapshot = await getDocs(q);
        //   querySnapshot.forEach((doc) => {
        //   scheduleToDisplay.push({
        //     name: doc.data().name,
        //     category: doc.data().category,
        //   })
        // });
        //   setDisplayCurrentSchedule(scheduleToDisplay);
        // }

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
          console.log("scheduleToDisplay : ", scheduleToDisplay);
          setDisplayCurrentSchedule(scheduleToDisplay);
          console.log("displayCurrentSchedule : ", displayCurrentSchedule);
        },
        // (error) => {}
      );

    const unSubscribeSchedule = onSnapshot(
      collection(db, "schedules"),
      (collectionSnapshot) => {
        const schedule = [];
        collectionSnapshot.forEach((doc) => {
          schedule.push({
            id: doc.id,
            date: doc.data().date,
            items: doc.data().items,
            // add key property set to id for help with dnd
          });
        });
        setSchedule(schedule);
      },
      // (error) => {}
    );

    const initialize = () => {
      unSubscribeTimeBlocks();
      unSubscribeCategory();
      unSubscribeSchedule();
      findSchedule();
    }
    return initialize;
  }, []);

  const handleClick = () => {
    formVisible ? setFormVisible(false) : setFormVisible(true);
  }

// DATABASE LOGIC =================================================================================
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

  const addItemToSchedule = async (item, currentSchedule) => {
    const reference = doc(db, "schedules", currentSchedule)
    await updateDoc(reference, {
      items: arrayUnion(item)
    });
  }

  // const getScheduleToDisplay = (schedules) => {
  //   const scheduleItemsToDisplay = [];
  //   const targetSchedule = schedule.find(({ date }) => date === currentDay);
  //   targetSchedule.items.forEach((item) => {
  //     scheduleItemsToDisplay.push(item);
  //   });
  //   return scheduleItemsToDisplay;
  // };

// ================================================================================================
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
    const removedItem = { ...removed, id: v4() };
    destClone.splice(droppableDestination.index, 0, removed);
    sourceClone.splice(droppableSource.index, 0, removedItem); // replaces the dragged timeBlock with a copy (but assigns a new id in the process)
    
    // const result = {};
    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;
    
    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone,
      removedItem: removedItem
    };

    
    // return result;
  };

  // const copy = (source, destination, droppableSource, droppableDestination) => {
  //   const sourceClone = Array.from(source);
  //   const destClone = Array.from(destination);
  //   const copyItem = sourceClone[droppableSource.index];

  //   destClone.splice(droppableDestination.index, 0, { ...copyItem, id: v4() });

  //   return destClone;
  // };

  const onDragEnd = (result) => {
    const { source, destination, } = result;

    if(!destination) return;
    
    if(source.droppableId === 'schedule' && destination.droppableId === 'schedule') {
      setSchedule(reorder(schedule, source.index, destination.index));
    }
    else if (source.droppableId === 'timeBlockList' && destination.droppableId === 'timeBlockList') {
      setTimeBlockList(reorder(timeBlockList, source.index, destination.index));
    }
    else {
      const result = move(timeBlockList, schedule, source, destination);
      setTimeBlockList(result.timeBlockList)
      setSchedule(result.schedule)
      // addItemToSchedule(result.removedItem, schedule)
    };
    // console.log('timeBlocks', timeBlockList);
    // console.log('schedule', schedule);
    // console.log('result', result);
  }
  
  let currentState = null;
  let otherCurrentState = null;
  let dateDisplay = <SelectDate currentDay={currentDay} nextDay={nextDay} prevDay={prevDay} />;
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
    currentState = <TimeBlockList timeBlockList={timeBlockList} />;
    otherCurrentState = <Schedule 
                          schedule={schedule}
                          // scheduleToDisplay={displayCurrentSchedule} 
                          addItemToSchedule={addItemToSchedule} 
                          addSchedule0={addSchedule0}
                          currentDay={currentDay}
                           />;
    buttonOne = 'go to timeblock form';
    
  }
  
  return (
    <React.Fragment>
      {topTaskBar}
      <StyledMainBodyDiv>
      {console.log('schedule', schedule)}
      {console.log('displayCurrentSchedule', displayCurrentSchedule)}
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
