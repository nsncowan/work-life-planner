import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";
import PlannerViewSelector from "./PlannerViewSelector";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import NewCategoryForm from "./NewCategoryForm";


function TimeBlockControl() {

  const Button = styled.button `
    cursor: pointer;
    width: 8.11rem;
    padding: .77rem 0;
    border-radius: 54px;
    background-color: #FFF5E4;
    text-align: center;
    font-size: .833rem;
    transition: background-color .25s;
    border: 2px solid #FF9494;
    color: #FF9494;
    font-weight: 500;
    &:hover {
      color: #FFF5E4;
      background-color: #FF9494;
    }
  `;

  // data state slices
  const [timeBlockList, setTimeBlockList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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
    buttonOne = 'go to timeblock form';
  }

  return (
    <React.Fragment>
      {topTaskBar}
      {currentState}
      {otherCurrentState}
      <Button onClick={handleClick}>{buttonOne}</Button>
      {/* {bottomTaskBar} */}
    </React.Fragment>
  );





}

export default TimeBlockControl;