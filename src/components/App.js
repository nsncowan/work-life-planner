import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import { DragDropContext } from "react-beautiful-dnd";
import SignIn from "./SignIn";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeeklyView from "./WeeklyView";
import Welcome from "./Welcome";
import styled from 'styled-components';


function App(){

  const AppStyles = {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: "100%",
    padding: "0 10% 10% 10%",
    backgroundColor: '#FFF5E4',
    backgroundSize: "cover",
    backgroundPosition: "center",
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
            {/* <Route path="/weekly-view" element={<WeeklyView />} /> */}
            <Route path="/main" element={<TimeBlockControl />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
