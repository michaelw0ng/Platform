import React from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <div className="separation">
        <div className="navigation">
          <Link to="/" id="title">
            Platform
          </Link>
        </div>
      </div>
      <div className="separation">
        <div className="bodyNavigation">
          <div id="student">
            <Link to="/student" className="links">
              Student
            </Link>
          </div>
        </div>
        <div className="bodyNavigation">
          <div id="campus">
            <Link to="/campus" className="links">
              Campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
