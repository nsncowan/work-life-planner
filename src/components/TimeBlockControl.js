import React, { useEffect, useState } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";
import styled from 'styled-components';
import { v4 } from 'uuid';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db, auth } from "../firebase";
import { collection, doc, addDoc, onSnapshot, orderBy, updateDoc, query, where, deleteDoc, arrayRemove } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Schedule from "./Schedule";
import SelectDate from "./SelectDate";
import { format, addDays, startOfWeek, endOfWeek, startOfToday, parseISO, parse, add, subDays, eachDayOfInterval } from "date-fns";
import CategoryPieChart from "./CategoryPieChart";
import WeeklyView from "./WeeklyView";


const StyledMainBodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  width: 80%;
  border: 2px solid #FF9494;
  padding: 5px;
  `;
  
function TimeBlockControl() {
  let today = startOfToday();
  const [unFormattedCurrentDay, setUnformattedCurrentDay] = useState(today);
  const [currentDay, setCurrentDay] = useState(format(today, 'MM-dd-yyyy'));
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState(format(startOfWeek(today, { weekStartsOn: 0 }), 'MM-dd-yyyy'));
  const [endOfCurrentWeek, setEndOfCurrentWeek] = useState(format(endOfWeek(today, { weekStartsOn: 0 }), 'MM-dd-yyyy'));
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [weeklySchedules, setWeeklySchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [scheduleToDisplay, setScheduleToDisplay] = useState([]);
  const [weeklyView, setWeeklyView] = useState(false);
  const [viewSelector, setViewSelector] = useState('timeBlockList');
  const [formVisible, setFormVisible] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([]);
  
// ==================================== DATE LOGIC ================================================
  function nextDay(/* weeklyView */) {
    let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
    if (weeklyView) {
      let nextWeekStart = startOfWeek(addDays(newDay, 7));
      setCurrentDay(format(nextWeekStart, 'MM-dd-yyyy'));
      setUnformattedCurrentDay(nextWeekStart);
    } else {
      let nextDay = addDays(newDay, 1)
      setCurrentDay(format(nextDay, 'MM-dd-yyyy'))
      setUnformattedCurrentDay(nextDay);
    }
  }
  
  function prevDay(/* weeklyView */) {
    let newDay = parse(currentDay, 'MM-dd-yyyy', new Date());
    if (weeklyView) {
      let prevWeekStart = startOfWeek(subDays(newDay, 7));
      setCurrentDay(format(prevWeekStart, 'MM-dd-yyyy'));
      setUnformattedCurrentDay(prevWeekStart);
    } else {
      let prevDay = subDays(newDay, 1);
      setCurrentDay(format(prevDay, 'MM-dd-yyyy'));
      setUnformattedCurrentDay(prevDay);
    }
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
      // console.log('timeblocks: ', timeBlocks);
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

        const unSubscribeSchedule = onSnapshot(
        collection(db, "schedules"),
        (collectionSnapshot) => {
          const schedules = [];
          collectionSnapshot.forEach((doc) => {
            schedules.push({
              id: doc.id,
              date: doc.data().date,
              items: doc.data().items
            });
          });
          setSchedules(schedules);
          console.log('schedules', schedules)
        },
        // (error) => {}
        );
        
        const initialize = () => {
          unSubscribeTimeBlocks();
          unSubscribeCategory();
          unSubscribeSchedule();
        }
        return initialize;
  }, []);

  useEffect(() => {
    // const currentSchedule = []

    const ref = collection(db, "schedules");
    const q = query(ref, where("date", "==", currentDay));
    const findSchedule = 
        onSnapshot(q,(snapshot) => {
          const thisSchedule = [];
          snapshot.docs.forEach((doc) => {
            thisSchedule.push({
              id: doc.id,
              date: doc.data().date,
              items: doc.data().items,
            });
          });
          if (thisSchedule.length === 0) {
            addSchedule({
              date: currentDay,
              items: [
                { id: v4(), name: 'Start Your Day Here', category: 'Other' },
               ]
            });
          }
          console.log('thisSchedule', thisSchedule);
          setScheduleToDisplay(thisSchedule);

          const items = thisSchedule.map((entry) => {
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
        console.log('startOfWeek: ', startOfCurrentWeek);
        console.log('endOfWeek: ', endOfCurrentWeek);

    return () => findSchedule();
  }, [currentDay])

  useEffect(() => {
    const dateRange = eachDayOfInterval({start: startOfWeek(unFormattedCurrentDay, { weekStartsOn: 0 }), end: endOfWeek(unFormattedCurrentDay, { weekStartsOn: 0 }) });
    const formattedDateRange = dateRange.map(date => format(date, 'MM-dd-yyyy'));

    const ref = collection(db, "schedules");
    const q = query(ref, where('date', 'in', formattedDateRange), orderBy('date'));
    const getWeeklySchedules = 
        onSnapshot(q,(snapshot) => {
          const weeklySchedules = [];
          snapshot.docs.forEach((doc) => {
            weeklySchedules.push({
              id: doc.id,
              date: doc.data().date,
              items: doc.data().items,
            });
          });
          const sortedWeeklySchedules = weeklySchedules.sort(
            (a, b) => Number(a.date) - Number(b.date),
          );
          setWeeklySchedules(sortedWeeklySchedules);
        },
        // (error) => {}
        );
        console.log('weeklySchedules', weeklySchedules);
    return () => getWeeklySchedules();
  }, [currentDay])
// ================================================================================================

const handleClick = () => {
    formVisible ? setFormVisible(false) : setFormVisible(true);
  }
const handleWeeklyViewClick = () => {
    weeklyView ? setWeeklyView(false) : setWeeklyView(true);
  }

// ====================================== DATABASE LOGIC ==========================================
  const addTimeBlock = async (timeBlock) => {
    const collectionReference = collection(db, "timeBlocks");
    await addDoc(collectionReference, timeBlock);
  }

  const addCategory = async (category) => {
    await addDoc(collection(db, "categories"), category);
  }
  
  const addSchedule = async (schedule) => {
    await addDoc(collection(db, "schedules"), schedule);
  }
  
  const addItemToSchedule = async (currentSchedule) => {
    const reference = doc(db, "schedules", currentSchedule.id)
    await updateDoc(reference, currentSchedule);
  }

  // const deleteItem = async (currentSchedule, item) => {
  //   const reference = doc(db, "schedules", currentSchedule.id);
  //   await updateDoc(reference, {
  //             items: arrayRemove(item.id)
  //           });
  //   };
  
  const deleteScheduleItems = async (timeBlockId) => {
    const updatedScheduleItems = [...scheduleItems];

    const index = updatedScheduleItems.findIndex((timeBlock) => timeBlock.id === timeBlockId);
    
    if (index !== -1) {
      updatedScheduleItems.splice(index, 1);
      setScheduleItems(updatedScheduleItems);
    }
  };
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
  
  let sideComponent = null;
  let mainComponent = null;
  let dateDisplay = <SelectDate currentDay={currentDay} nextDay={nextDay} prevDay={prevDay} />;
  let buttonOne = null;
  let buttonTwo = null;
  let topTaskBar = <PlannerViewSelector />;  
  
  if(formVisible) {
    sideComponent = <TimeBlockList 
                        timeBlockList={timeBlockList} />;
    mainComponent = <NewTimeBlockForm 
                        addTimeBlock = {addTimeBlock}
                        addCategory={addCategory}
                        categoryList = {categoryList} />;
    buttonOne = 'Timeblock list'
    buttonTwo = 'Weekly / Daily View'
  }

  else if(weeklyView) {
    sideComponent = <TimeBlockList 
                        timeBlockList={timeBlockList} />;
    mainComponent = <WeeklyView
                        weeklySchedules={weeklySchedules}
                        currentDay={currentDay} />;
    buttonOne = 'Timeblock Form'
    buttonTwo = 'Weekly / Daily View'
  }
  
  else {
    sideComponent = <TimeBlockList 
                          timeBlockList={timeBlockList} />;
    // pieChartComponent = <CategoryPieChart scheduleItems={scheduleItems} />;
    mainComponent = <Schedule 
                           weeklySchedules={weeklySchedules}
                           scheduleToDisplay={scheduleToDisplay} 
                           addItemToSchedule={addItemToSchedule}
                           addSchedule={addSchedule}
                           currentDay={currentDay}
                           scheduleItems={scheduleItems}
                           deleteScheduleItems={deleteScheduleItems}
                            />;
    buttonOne = 'Timeblock Form';
    buttonTwo = 'Weekly / Daily View'
  }
  
  return (
    <React.Fragment>
        {topTaskBar}
        {dateDisplay}
        <button onClick={handleClick}>{buttonOne}</button>
        <button onClick={handleWeeklyViewClick}>{buttonTwo}</button>
        <Grid container>
          <StyledMainBodyDiv>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid item md={4}>
                {sideComponent}
              </Grid>
              <Grid item md={8}>
                {mainComponent}
              </Grid>
              {/* {pieChartComponent} */}
            </DragDropContext>
          </StyledMainBodyDiv>
        </Grid>
      </React.Fragment>
  );
}

export default TimeBlockControl;
