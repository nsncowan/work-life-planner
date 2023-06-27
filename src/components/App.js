import React from "react";
import "./../App.css"
import Header from "./Header";
import NewTimeBlockForm from "./NewTImeBlockForm";
import TimeBlockList from "./TimeBlockList";

function App(){
  return (
    <React.Fragment>
      <Header />
      <NewTimeBlockForm />
      <TimeBlockList />

    </React.Fragment>
  );
}

export default App;
