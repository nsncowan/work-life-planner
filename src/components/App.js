import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import DayView from "./DayView";
function App(){
  return (
    <React.Fragment>
      <Header />
      <TimeBlockControl />
      <DayView />
    </React.Fragment>
  );
}

export default App;
