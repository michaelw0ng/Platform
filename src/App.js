import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Homepage from "./Pages/Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Homepage />} />
      </Switch>
    </Router>
  );
}

export default App;
