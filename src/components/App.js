import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import { DragDropContext } from "react-beautiful-dnd";
function App(){

  const AppStyles = {
    height: "100%",
    padding: "0 17% 10% 17%",
    backgroundColor: '#FFF5E4',
    // backgroundImage: "url(./background_photo_desktop.jpg)",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 500,
    color: "#FF9494",
  };

  return (
    <div style={AppStyles}>
      <React.Fragment>
        <Header />
        <DragDropContext onDragEnd={e => console.log(e)}>
          <TimeBlockControl />
        </DragDropContext>
        {/* <DayView /> */}
      </React.Fragment>
    </div>
  );
}

export default App;
