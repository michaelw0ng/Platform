import React, { useEffect } from "react";
import Navbar from "../Navbar.js";
import { useParams } from "react-router-dom";

export default function SpecificStudent() {
  const { student } = useParams();
  useEffect(() => {
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
    });
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
    if (college.value != "" && address.value === "") {
      alert("Please enter college address");
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/editstudent");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", () => {
      alert(xhr.responseText);
    });
  };

  return (
    <div id="page">
      <Navbar />
      <form>
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
      </form>
    </div>
  );
}
