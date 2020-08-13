import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Attendance from "./components/attendance/Attendance";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Verification from "./components/auth/Verification";
import { GuildAPI } from "./components/API/GuildAPI";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authUser, setAuthUser] = useState({
    IGN: "",
  });
  const checkAuth = async () => {
    try {
      const res = await GuildAPI.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsAuth(true);
      setAuthUser(res.data);
    } catch (error) {
      setIsAuth(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, [isAuth]);

  return (
    <div className="App">
      <Navigation
        isAuth={isAuth}
        authUser={authUser}
        setIsAuth={setIsAuth}
      ></Navigation>
      <div className="px-10">
        <Switch>
          <Route path="/login">
            {!isAuth ? <Login setIsAuth={setIsAuth} /> : <Redirect to="/" />}
          </Route>
          <Route path="/register">
            {!isAuth ? <Register /> : <Redirect to="/" />}
          </Route>
          {/* issue verification block access maybe with token? */}
          <Route path="/verification">
            {!isAuth ? <Verification /> : <Redirect to="/" />}
          </Route>
          <Route path="/attendance">
            {isAuth ? <Attendance /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">{isAuth ? <Home /> : <Redirect to="/login" />}</Route>
        </Switch>
      </div>
    </div>
  );
}
export default App;
