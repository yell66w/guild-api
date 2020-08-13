import React from "react";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Attendance from "./components/attendance/Attendance";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <div className="px-10">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
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
