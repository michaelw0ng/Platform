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
  const globalCounter = 0;
  const tbody = document.getElementById("tbody");
  for (let i = 0; i < Object.keys(obj).length; i++) {
    let tr = "<tr>";
    tr +=
      "<td>" + obj[i].name + "</td>" + "<td>" + obj[i].address + "</td></tr>";
    tbody.innerHTML += tr;
  }
};
