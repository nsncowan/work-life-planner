import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <h1>WorkLifePlanner</h1>
      <ul>
        <li><Link to="/">Welcome</Link> </li>
        <li><Link to="/main">Main Page</Link> </li>
        <li><Link to="/sign-in">Sign In</Link> </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;