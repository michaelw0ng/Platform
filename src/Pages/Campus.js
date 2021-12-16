import React from "react";
import Navbar from "../Navbar";
import { useEffect } from "react";
import "../css/campus.css";

export default function Campus() {
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/campuses");
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
      addCampus();
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
        <h1>Add Campus</h1>
        Name:
        <input id="name"></input>
        <br></br>
        <br></br>
        Address:
        <input id="address"></input>
        <br></br>
        <br></br>
        <button id="submit">Submit</button>
        <h1>Campuses</h1>
        <table>
          <tbody id="tbody"></tbody>
        </table>
      </form>
    </div>
  );
}

const addCampus = () => {
  const inputs = document.getElementsByTagName("input");
  let data = {};
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value != "") {
      data[inputs[i].id] = inputs[i].value;
    }
  }
  data = JSON.stringify(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/addcampus");
  xhr.send(data);
  xhr.addEventListener("load", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/campuses");
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
    td1.innerHTML = obj[i].name;
    const td2 = document.createElement("td");
    td2.innerHTML = obj[i].address;
    const x = document.createElement("p");
    x.innerHTML = "X";
    x.addEventListener("click", () => {
      const data = JSON.stringify(obj[i]);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/removeCampus");
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/campuses");
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
    tr.appendChild(x);
    tbody.appendChild(tr);
  }
};
