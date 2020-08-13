import React, { useState, useEffect } from "react";
import GuildStats from "../guild/GuildStats";
import Breadcrumb from "../Breadcrumb";
import AttendanceListWidget from "./AttendanceListWidget";
import { GuildAPI } from "../API/GuildAPI";
import Loading from "../misc/Loading";

const Home = () => {
  const [attendances, setAttendances] = useState([]);
  const getAttendance = async () => {
    const res = await GuildAPI.get("attendances", {
      params: {
        limit: 5,
      },
    });
    setAttendances(res.data);
  };
  useEffect(() => {
    getAttendance();
  }, []);

  return attendances.length > 0 ? (
    <div>
      <Breadcrumb name="Home"></Breadcrumb>
      <div className="flex flex-wrap flex-col md:flex-row justify-evenly items-start">
        <AttendanceListWidget attendances={attendances}></AttendanceListWidget>
        <GuildStats></GuildStats>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
