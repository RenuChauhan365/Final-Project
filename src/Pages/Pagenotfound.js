import React from "react";
import {  NavLink } from "react-router-dom";

function Pagenotfound() {
  return (
    <div title={"Invalid Search "}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page not found</h2>
        <NavLink to="/" className="pnf-btn">
          Go Back
        </NavLink>
      </div>
    </div>
  );
}

export default Pagenotfound;
