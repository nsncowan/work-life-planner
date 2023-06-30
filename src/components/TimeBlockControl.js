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


  const submitTimeBlockForm0 = async (timeBlock) => {
    await addDoc(collection(db, "timeBlocks"), timeBlock);
  }




}

export default TimeBlockControl;