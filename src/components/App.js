import React from "react";
import "./../App.css"
import Header from "./Header";
import TimeBlockControl from "./TimeBlockControl";
import { DragDropContext } from "react-beautiful-dnd";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
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
        <Container className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <SignUp />
          </div>
        </Container>
        {/* <Header />
        <TimeBlockControl /> */}
      </React.Fragment>
    </div>
  );
}

export default App;
