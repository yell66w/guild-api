import React, { useState, useEffect } from "react";
import { AttendanceWidgetModel } from "../interface/AttendanceModel";
interface Props {
  attendance: AttendanceWidgetModel;
}

const AttendanceBoxWidget: React.FC<Props> = ({ attendance }) => {
  const { name, status } = attendance;
  const [color, setColor] = useState("bg-gray-600");
  const [marked, setMarked] = useState(false);
  const [buttonMarkStyle, setButtonMarkStyle] = useState("");

  useEffect(() => {
    marked
      ? setButtonMarkStyle(
          "transition duration-500 ease-in-out py-1 border border-green-500 px-3 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
        )
      : setButtonMarkStyle(
          "transition duration-500 ease-in-out border border-green-500 py-1 px-3 text-sm text-green-500 rounded-full hover:bg-green-500 hover:text-white focus:outline-none"
        );
  }, [marked]);
  useEffect(() => {
    switch (status) {
      case "OPEN":
        setColor("bg-green-500 animate-pulse");
        break;
      case "CLOSED":
        setColor("bg-red-500");
        break;
      case "PAID":
        setColor("bg-orange-500");
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="mb-3 bg-white shadow-md p-5 rounded-lg flex  flex-row">
      <div className="w-2/3">
        <div>
          <span
            className={`${color} inline-block rounded-full h-3 w-3 mr-1`}
          ></span>
          <small>{status}</small>
        </div>
        <div>
          <h1 className="font-bold">{name}</h1>
        </div>
      </div>
      <div className="w-1/3 flex flex-row-reverse items-center ">
        <button onClick={() => setMarked(!marked)} className={buttonMarkStyle}>
          {marked ? "Marked" : "Mark"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceBoxWidget;
