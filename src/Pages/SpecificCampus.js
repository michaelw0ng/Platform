import React, { useEffect } from "react";
import Navbar from "../Navbar.js";
import { useParams, useNavigate } from "react-router-dom";

export default function SpecificCampus() {
  const history = useNavigate();
  const populateSecondTable = (obj) => {
    const tbody = document.getElementById("tbody2");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (obj.length === 0) {
      const text = document.createElement("div");
      text.innerHTML = "No students currently unaffiliated with this campus";
      tbody.appendChild(text);
    }
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = obj[i].firstName;
      const td2 = document.createElement("td");
      td2.innerHTML = obj[i].lastName;
      td1.addEventListener("click", () => {
        history(`/student/${obj[i].id}`);
      });
      td1.addEventListener("mouseover", () => {
        td1.style.cursor = "pointer";
      });
      td1.addEventListener("mouseout", () => {
        td1.style.cursor = "auto";
      });
      td2.addEventListener("click", () => {
        history(`/student/${obj[i].id}`);
      });
      td2.addEventListener("mouseover", () => {
        td2.style.cursor = "pointer";
      });
      td2.addEventListener("mouseout", () => {
        td2.style.cursor = "auto";
      });
      const x = document.createElement("b");
      x.innerHTML = "+";
      x.addEventListener("click", () => {
        obj[i].CampusId = campus;
        const data = JSON.stringify(obj[i]);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/enrollStudent");
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/unaffiliatedstudents");
          xhttp.send(campus);
          xhttp.addEventListener("load", () => {
            const tableData = JSON.parse(xhttp.responseText);
            console.log(tableData);
            populateSecondTable(tableData);
            const xmlhr = new XMLHttpRequest();
            xmlhr.open("POST", "http://localhost:8080/enrolledstudents");
            xmlhr.send(campus);
            xmlhr.addEventListener("load", () => {
              const tableData = JSON.parse(xmlhr.responseText);
              console.log(tableData);
              populateTable(tableData);
            });
          });
        });
      });
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(x);
      tbody.appendChild(tr);
    }
  };
  const populateTable = (obj) => {
    const tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (obj.length === 0) {
      const text = document.createElement("div");
      text.innerHTML = "No students currently enrolled on this campus";
      tbody.appendChild(text);
    }
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = obj[i].firstName;
      const td2 = document.createElement("td");
      td2.innerHTML = obj[i].lastName;
      td1.addEventListener("click", () => {
        history(`/student/${obj[i].id}`);
      });
      td1.addEventListener("mouseover", () => {
        td1.style.cursor = "pointer";
      });
      td1.addEventListener("mouseout", () => {
        td1.style.cursor = "auto";
      });
      td2.addEventListener("click", () => {
        history(`/student/${obj[i].id}`);
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
        xhr.open("POST", "http://localhost:8080/unenrollStudent");
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const xhttp = new XMLHttpRequest();
          xhttp.open("POST", "http://localhost:8080/enrolledstudents");
          xhttp.send(campus);
          xhttp.addEventListener("load", () => {
            const tableData = JSON.parse(xhttp.responseText);
            console.log(tableData);
            populateTable(tableData);
          });
          const http = new XMLHttpRequest();
          http.open("POST", "http://localhost:8080/unaffiliatedstudents");
          http.send(campus);
          http.addEventListener("load", () => {
            const tableData = JSON.parse(http.responseText);
            console.log(tableData);
            populateSecondTable(tableData);
          });
        });
      });
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(x);
      tbody.appendChild(tr);
    }
  };
  const { campus } = useParams();
  const deleteCampus = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/removecampusbyid");
    xhr.send(campus);
    xhr.addEventListener("load", () => {
      const inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
      const form = document.getElementsByTagName("form")[0];
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      const text = document.createElement("div");
      text.innerHTML = "Campus deleted";
      form.appendChild(text);
    });
  };
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/getcampus");
    xhr.send(campus);
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      const data = JSON.parse(xhr.responseText)[0];
      console.log(data);
      const name = document.getElementById("name");
      const address = document.getElementById("address");
      const image = document.getElementById("image");
      const description = document.getElementById("description");
      name.value = data?.name;
      address.value = data?.address;
      image.value = data?.imgUrl;
      description.value = data?.description;
    });

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/enrolledstudents");
    xhttp.send(campus);
    xhttp.addEventListener("load", () => {
      const tableData = JSON.parse(xhttp.responseText);
      console.log(tableData);
      populateTable(tableData);
    });

    const http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8080/unaffiliatedstudents");
    http.send(campus);
    http.addEventListener("load", () => {
      const tableData = JSON.parse(http.responseText);
      console.log(tableData);
      populateSecondTable(tableData);
    });
  }, []);
  const edit = () => {
    let data = {};
    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const image = document.getElementById("image");
    const description = document.getElementById("description");
    data.id = campus;
    data.name = name?.value;
    data.address = address?.value;
    data.description = description?.value;
    data.imgUrl = image?.value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/editcampus");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", () => {
      alert(xhr.responseText);
    });
  };
  return (
    <div id="page">
      <Navbar />
      <form>
        <h1>Enrolled Students</h1>
        <table>
          <tbody id="tbody"></tbody>
        </table>
        <h1>Unaffiliated Students</h1>
        <table>
          <tbody id="tbody2"></tbody>
        </table>
        <h1>Edit College</h1>
        Name:
        <input id="name"></input>
        <br></br>
        <br></br>
        Address:
        <input id="address"></input>
        <br></br>
        <br></br>
        Image Url:
        <input id="image"></input>
        <br></br>
        <br></br>
        Description:
        <input id="description"></input>
        <br></br>
        <br></br>
        <button
          id="edit"
          onClick={(event) => {
            event.preventDefault();
            edit();
          }}
        >
          Edit
        </button>
        <button
          id="deleteCampus"
          onClick={(event) => {
            event.preventDefault();
            deleteCampus();
          }}
        >
          Delete Campus
        </button>
      </form>
    </div>
  );
}
