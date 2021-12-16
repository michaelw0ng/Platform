import React from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";

export default function Student() {
  useEffect(() => {
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
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
          alert("Please complete form data");
          return;
        }
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
        <button id="submit">Submit</button>
        <h1>Students</h1>
        <table>
          <tbody id="tbody"></tbody>
        </table>
      </form>
    </div>
  );
}

const addStudent = () => {
  const inputs = document.getElementsByTagName("input");
  let data = {};
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value != "") {
      data[inputs[i].id] = inputs[i].value;
    }
  }
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
  });
};

const populateTable = (obj) => {
  const tbody = document.getElementById("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
  for (let i = 0; i < Object.keys(obj).length; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = obj[i].firstName;
    const td2 = document.createElement("td");
    td2.innerHTML = obj[i].lastName;
    const td3 = document.createElement("td");
    td3.innerHTML = obj[i].email;
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
      });
    });
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(x);
    tbody.appendChild(tr);
  }
};
