import "./App.css";
import Homepage from "./Pages/Homepage";
import Campus from "./Pages/Campus";
import Student from "./Pages/Student";
import SpecificStudent from "./Pages/SpecificStudent";
import SpecificCampus from "./Pages/SpecificCampus";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log(this.props);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" element={<Homepage />} />
        </Switch>
        <Switch>
          <Route
            exact
            path="/campuses"
            element={<Campus redux={this.props} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/students"
            element={<Student redux={this.props} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/students/:student"
            element={<SpecificStudent redux={this.props} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/campuses/:campus"
            element={<SpecificCampus redux={this.props} />}
          />
        </Switch>
      </Router>
    );
  }
}

function fetchStudents() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_STUDENTS_REQUEST" });
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/students");
    xhttp.send();
    xhttp.addEventListener("load", () => {
      const students = JSON.parse(xhttp.responseText);
      dispatch({ type: "ADD_STUDENTS", students });
    });
  };
}

function fetchCampuses() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_CAMPUSES_REQUEST" });
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/campuses");
    xhttp.send();
    xhttp.addEventListener("load", () => {
      const campuses = JSON.parse(xhttp.responseText);
      dispatch({ type: "ADD_CAMPUSES", campuses });
    });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    fetchCampuses: () => dispatch(fetchCampuses()),
  };
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses,
    students: state.students,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
