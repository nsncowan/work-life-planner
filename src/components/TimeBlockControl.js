import React, { useEffect, useState } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import styled from 'styled-components';
import { v4 } from 'uuid';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db, auth } from "../firebase";
import { collection, doc, addDoc, onSnapshot, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc, query, where } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Schedule from "./Schedule";
import SelectDate from "./SelectDate";
import { format, addDays, eachDayOfInterval, startOfToday, startOfMonth, endOfMonth, parseISO, parse, add, subDays} from "date-fns";
import CategoryPieChart from "./CategoryPieChart";


const StyledMainBodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  width: 100%;
  border: 2px solid #FF9494;
  padding: 5px;
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
        console.log('scheduleToDisplay: ', scheduleToDisplay);
        console.log('scheduleItems: ', scheduleItems);
    return () => findSchedule();
  }, [])
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
  
  const addItemToSchedule = async (scheduleToEdit) => {
    const docRef = doc(db, "schedules", scheduleToEdit);
    await updateDoc(docRef, scheduleToEdit);
  }

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
    // const removedWithNewId = { ...removed, id: v4() };
    destClone.splice(droppableDestination.index, 0, { ...removed, id: v4() });
    sourceClone.splice(droppableSource.index, 0, removed); 
        
    return {
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone,
    };
  };

  const onDragEnd = (result) => {
    const { source, destination, } = result;

    if(!destination) return;
    
    if(source.droppableId === destination.droppableId) {
      if (source.droppableId === 'timeBlockList' && destination.droppableId === 'timeBlockList') {
        setTimeBlockList(reorder(timeBlockList, source.index, destination.index));
      }
      else {
        setScheduleItems(reorder(scheduleItems, source.index, destination.index));
      }
    }
    else {
      const result = move(timeBlockList, scheduleItems, source, destination);
      setTimeBlockList(result.timeBlockList)
      setScheduleItems(result.scheduleItems)
    };
    console.log('scheduleItems onDragEnd: ', scheduleItems)
    console.log('scheduleToDisplay onDragEnd: ', scheduleToDisplay)
    // console.log("result", result)
  }
  
  let currentState = null;
  let otherCurrentState = null;
  let pieChartComponent = null;
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
    // pieChartComponent = <CategoryPieChart scheduleItems={scheduleItems} />;
    otherCurrentState = <Schedule 
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
        {dateDisplay}
        <button onClick={handleClick}>{buttonOne}</button>
        <Grid container>
          <StyledMainBodyDiv>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid item md={6}>
                {currentState}
              </Grid>
              <Grid item md={6}>
                {otherCurrentState}
              </Grid>
              {/* {pieChartComponent} */}
            </DragDropContext>
          </StyledMainBodyDiv>
        </Grid>
      </React.Fragment>
  );
}

export default TimeBlockControl;
