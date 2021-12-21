import React from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Student(props) {
  const history = useNavigate();
  const addStudent = () => {
    const inputs = document.getElementsByTagName("input");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value != "") {
        data[inputs[i].id] = inputs[i].value;
      }
    }
    console.log(data);
    data = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/addstudent");
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:8080/students");
      xhttp.send();
      xhttp.addEventListener("load", () => {
        const tableData = JSON.parse(xhttp.responseText);
        console.log(tableData);
        populateTable(tableData);
      });
      props.redux.fetchStudents();
      props.redux.fetchCampuses();
    });
  };

  const populateTable = (obj) => {
    const tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (obj.length === 0) {
      const text = document.createElement("div");
      text.innerHTML =
        "No students currently exist in the database. Please add student to see students.";
      tbody.appendChild(text);
    }
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = obj[i].firstName;
      const td2 = document.createElement("td");
      td2.innerHTML = obj[i].lastName;
      td1.addEventListener("click", () => {
        history(`/students/${obj[i].id}`);
      });
      td1.addEventListener("mouseover", () => {
        td1.style.cursor = "pointer";
      });
      td1.addEventListener("mouseout", () => {
        td1.style.cursor = "auto";
      });
      td2.addEventListener("click", () => {
        history(`/students/${obj[i].id}`);
      });
      td2.addEventListener("mouseover", () => {
        td2.style.cursor = "pointer";
      });
      td2.addEventListener("mouseout", () => {
        td2.style.cursor = "auto";
      });
      const x = document.createElement("p");
      x.innerHTML = "X";
      x.addEventListener("click", () => {
        const data = JSON.stringify(obj[i]);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/removeStudent");
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/students");
          xhttp.send();
          xhttp.addEventListener("load", () => {
            const tableData = JSON.parse(xhttp.responseText);
            console.log(tableData);
            populateTable(tableData);
          });
          props.redux.fetchStudents();
        });
      });
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(x);
      tbody.appendChild(tr);
    }
  };
  useEffect(() => {
    console.log(props);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/students");
    xhr.send();
    xhr.addEventListener("load", () => {
      const tableData = JSON.parse(xhr.responseText);
      console.log(tableData);
      populateTable(tableData);
    });
    const button = document.getElementById("submit");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const inputs = document.getElementsByTagName("input");
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      if (email.value === "" || lastName.value === "" || email.value === "") {
        alert("Please enter full name and email");
        return;
      }
      const college = document.getElementById("college");
      const address = document.getElementById("collegeAddress");
      console.log(college.value + address.value);
      if (college?.value != "" && address?.value === "") {
        alert("Please enter college address");
        return;
      }
      addStudent();
      const tbody = document.getElementById("tbody");
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    });
  }, []);
  return (
    <div id="page">
      <Navbar />
      <form>
        <h1>Add Student</h1>
        First Name:
        <input id="firstName"></input>
        <br></br>
        <br></br>
        Last Name:
        <input id="lastName"></input>
        <br></br>
        <br></br>
        Email:
        <input id="email"></input>
        <br></br>
        <br></br>
        College:
        <input id="college"></input>
        <br></br>
        <br></br>
        College Address:
        <input id="collegeAddress"></input>
        <br></br>
        <br></br>
        <button id="submit">Submit</button>
        <h1>Students</h1>
        <table>
          <tbody id="tbody"></tbody>
        </table>
      </form>
    </div>
  );
}
