import React from "react";
import GuildStats from "../guild/GuildStats";
import Breadcrumb from "../Breadcrumb";
import AttendanceListWidget from "./AttendanceListWidget";

const Home = () => {
  return (
    <div>
      <Breadcrumb name="Home"></Breadcrumb>
      <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-start">
        <AttendanceListWidget></AttendanceListWidget>
        <GuildStats></GuildStats>
      </div>
    </div>
  );
};

export default Home;
