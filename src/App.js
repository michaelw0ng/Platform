import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Campus from "./Pages/Campus";
import Student from "./Pages/Student";
import SpecificStudent from "./Pages/SpecificStudent";
import SpecificCampus from "./Pages/SpecificCampus";

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
      <Switch>
        <Route exact path="/student/:student" element={<SpecificStudent />} />
      </Switch>
      <Switch>
        <Route exact path="/campus/:campus" element={<SpecificCampus />} />
      </Switch>
    </Router>
  );
}

export default App;
