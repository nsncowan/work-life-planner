import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";


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
            <Route path="/main" element={<TimeBlockControl />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
