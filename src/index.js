import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;

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
    students: state.students,
    campuses: state.campuses,
  };
}

connect(mapStateToProps, mapDispatchToProps)(App);

function studentsReducer(
  state = {
    students: [],
  },
  action
) {
  switch (action.type) {
    case "ADD_STUDENTS":
      return { ...state, students: action.students };

    default:
      return state;
  }
}

function campusesReducer(
  state = {
    campuses: [],
  },
  action
) {
  switch (action.type) {
    case "ADD_CAMPUSES":
      return { ...state, campuses: action.campuses };

    default:
      return state;
  }
}

const rootReducer = redux.combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
});

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
