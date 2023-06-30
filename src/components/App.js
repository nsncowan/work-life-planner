import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
function App(){
  return (
    <React.Fragment>
      <Header />
      <TimeBlockControl />
    </React.Fragment>
  );
}

export default App;
