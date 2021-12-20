import React, { useEffect } from "react";
import Navbar from "../Navbar.js";
import { useParams, useNavigate } from "react-router-dom";

export default function SpecificStudent() {
  const history = useNavigate();
  const { student } = useParams();
  const populateTable = (obj) => {
    const tbody = document.getElementById("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    if (obj.length === 0) {
      const text = document.createElement("div");
      text.innerHTML =
        "No campuses currently exist in the database. Please add campus to see campuses.";
      tbody.appendChild(text);
    }
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.innerHTML = obj[i].name;
      td1.addEventListener("click", () => {
        history(`/campus/${obj[i].id}`);
      });
      td1.addEventListener("mouseover", () => {
        td1.style.cursor = "pointer";
      });
      td1.addEventListener("mouseout", () => {
        td1.style.cursor = "auto";
      });
      const td2 = document.createElement("td");
      const img = document.createElement("img");
      img.src = obj[i].imgUrl;
      td2.appendChild(img);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
  };
  const populateForm = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/getstudent");
    xhr.send(student);
    xhr.addEventListener("load", () => {
      console.log(xhr.responseText);
      const data = JSON.parse(xhr.responseText)[0];
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const gpa = document.getElementById("gpa");
      const image = document.getElementById("image");
      const email = document.getElementById("email");
      const college = document.getElementById("college");
      const address = document.getElementById("collegeAddress");
      firstName.value = data.firstName;
      lastName.value = data.lastName;
      gpa.value = data.gpa;
      image.value = data.imageUrl;
      email.value = data.email;
      college.value = data.college;
      address.value = data.collegeAddress;
      const text = document.getElementById("enrollment");
      if (
        data.college === null ||
        data.collegeAddress === null ||
        data.college === "" ||
        data.collegeAddress === "" ||
        data.college === undefined ||
        data.collegeAddress === undefined ||
        data.CampusId === null ||
        data.CampusId === "" ||
        data.CampusId === undefined
      ) {
        text.innerHTML = "Student is not enrolled at any campus";
        const p = document.createElement("p");
        text.appendChild(p);
      } else {
        text.innerHTML = "";
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/getcampus");
        xhttp.send(data.CampusId);
        xhttp.addEventListener("load", () => {
          const tableData = JSON.parse(xhttp.responseText);
          console.log(tableData);
          populateTable(tableData);
        });
      }
    });
  };
  useEffect(() => {
    populateForm();
  }, []);
  const edit = () => {
    let data = {};
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const gpa = document.getElementById("gpa");
    const image = document.getElementById("image");
    const email = document.getElementById("email");
    const college = document.getElementById("college");
    const address = document.getElementById("collegeAddress");
    data.id = student;
    data.firstName = firstName?.value;
    data.lastName = lastName?.value;
    data.gpa = gpa?.value;
    data.imageUrl = image?.value;
    data.email = email?.value;
    data.college = college?.value;
    data.collegeAddress = address?.value;
    if (
      (college.value != "" && address.value === "") ||
      (college.value === "" && address.value != "")
    ) {
      alert(
        "If editing college information, please enter college name and address"
      );
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/editstudent");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", () => {
      populateForm();
      alert(xhr.responseText);
    });
  };

  const deleteStudent = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/removestudentbyid");
    xhr.send(student);
    xhr.addEventListener("load", () => {
      const form = document.getElementById("form");
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      const text = document.createElement("div");
      text.innerHTML = "Student deleted";
      form.appendChild(text);
    });
  };

  return (
    <div id="page">
      <Navbar />
      <form id="form">
        <h1>Edit Student</h1>
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
        Image Url:
        <input id="image"></input>
        <br></br>
        <br></br>
        GPA:
        <input id="gpa"></input>
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
          onClick={(event) => {
            event.preventDefault();
            deleteStudent();
          }}
        >
          Delete Student
        </button>
        <h1>Enrollment</h1>
        <div id="enrollment"></div>
        <table>
          <tbody id="tbody"></tbody>
        </table>
      </form>
    </div>
  );
}
