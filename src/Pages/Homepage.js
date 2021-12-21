import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { store } from "../index";

export default function Homepage() {
  useEffect(() => {
    console.log(store.getState());
  }, []);
  return (
    <div id="page">
      <Navbar />
    </div>
  );
}
