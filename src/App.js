import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Campus from "./Pages/Campus";
import Student from "./Pages/Student";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Homepage />} />
      </Switch>
      <Switch>
        <Route exact path="/campus" element={<Campus />} />
      </Switch>
      <Switch>
        <Route exact path="/student" element={<Student />} />
      </Switch>
    </Router>
  );
}

export default App;
