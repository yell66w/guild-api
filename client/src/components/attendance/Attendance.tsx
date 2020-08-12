import React from "react";

interface Attendance {
  id: number;
  name: string;
  items: Items[];
}
interface Items {
  id: number;
  itemId: number;
  qty: number;
}

const Attendance: React.FC = () => {
  return <div className="text-white flex p-6 ">Attendance</div>;
};

export default Attendance;
