import React, { useEffect, useState } from "react";
import AttendanceBoxWidget from "./AttendanceBoxWidget";
import { GuildAPI } from "../API/GuildAPI";
import { AttendanceWidgetModel } from "../interface/AttendanceModel";

const AttendanceListWidget = () => {
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
  return (
    <div className="w-full md:w-2/3 ">
      {attendances
        ? attendances.map((attendance: AttendanceWidgetModel) => {
            return (
              <AttendanceBoxWidget
                key={attendance.id}
                attendance={attendance}
              ></AttendanceBoxWidget>
            );
          })
        : "Loading"}
    </div>
  );
};

export default AttendanceListWidget;
