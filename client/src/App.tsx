import React from "react";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Attendance from "./components/attendance/Attendance";
function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <div className="px-10">
        <Switch>
          <Route path="/attendance">
            <Attendance />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default App;
