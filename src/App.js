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
          <Route exact path="/campus" element={<Campus redux={this.props} />} />
        </Switch>
        <Switch>
          <Route
            exact
            path="/student"
            element={<Student redux={this.props} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/student/:student"
            element={<SpecificStudent redux={this.props} />}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/campus/:campus"
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
    fetch("http://localhost:8080/students")
      .then((response) => response.json())
      .then((students) => {
        dispatch({ type: "ADD_STUDENTS", students });
      });
  };
}

function fetchCampuses() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_CAMPUSES_REQUEST" });
    fetch("http://localhost:8080/campuses")
      .then((response) => response.json())
      .then((campuses) => {
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
