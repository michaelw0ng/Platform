import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const axios = require("axios");

const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;

// start of testing

function fetchStudents() {
  return (dispatch) => {
    dispatch({ type: "students" });
    axios.get("http://localhost:8080/students").then((response) => {
      const students = response;
      console.log(response);
      dispatch({ type: "students", students });
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

// function rootReducer(
//   state = {
//     students: [],
//     campuses: [],
//   },
//   action
// ) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// function studentsReducer(
//   state = {
//     students: [],
//   },
//   action
// ) {
//   switch (action.type) {
//     case "ADD_STUDENTS":
//       return { ...state, students: action.students };

//     default:
//       return state;
//   }
// }

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const initState = {
  students: [],
  campuses: [],
};

function receiveData(data) {
  return {
    type: "RECEIVE_DATA",
    data,
  };
}

const initializeStore = (state = initState, action) => {
  switch (action.type) {
    case "RECEIVE_DATA":
      Object.assign({}, ...state, action.data);
    case "students": {
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:8080/students");
      xhttp.send();
      xhttp.addEventListener("load", () => {
        const students = JSON.parse(xhttp.responseText);
        return students;
      });
    }
    case "campuses": {
      fetchData();
      // const xhr = new XMLHttpRequest();
      // xhr.open("POST", "http://localhost:8080/campuses");
      // xhr.send();
      // xhr.addEventListener("load", () => {
      //   const campuses = JSON.parse(xhr.responseText);
      //   return {
      //     students: [],
      //     campuses: campuses,
      //   };
      // });
      // axios
      //   .post("http://localhost:8080/campuses")
      //   .then(function (response) {
      //     const campuses = JSON.parse(response);
      //     return {
      //       students: [],
      //       campuses: campuses,
      //     };
      //   })
      //   .catch(function (error) {
      //     // throw error
      //   });
    }
    default:
      return state;
  }
};

function fetchData() {
  return (dispatch, getState) => {
    const url = "http://localhost:8080/campuses";
    fetch(url)
      .then((response) => {
        const data = JSON.parse(response);
        dispatch(receiveData(data));
        return data;
      })
      .catch((error) => {});
  };
}

// let store = createStore(initializeStore, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
