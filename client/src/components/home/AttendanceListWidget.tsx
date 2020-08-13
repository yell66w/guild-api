import React from "react";
import AttendanceBoxWidget from "./AttendanceBoxWidget";
import { AttendanceWidgetModel } from "../interface/AttendanceModel";

interface Props {
  attendances: AttendanceWidgetModel[];
}

const AttendanceListWidget: React.FC<Props> = ({ attendances }) => {
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
