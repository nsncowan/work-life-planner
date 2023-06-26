import React from "react";

function App(){
  return ( 
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/" element={<TicketControl />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
