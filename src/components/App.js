import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import { DragDropContext } from "react-beautiful-dnd";
import SignIn from "./SignIn";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeeklyView from "./WeeklyView";

function App(){

  const AppStyles = {
    height: "100%",
    padding: "0 10% 10% 10%",
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
        <Router>
          <Header />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/weekly-view" element={<WeeklyView />} />
            <Route path="/" element={<TimeBlockControl />} />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
