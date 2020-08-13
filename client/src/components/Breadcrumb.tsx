import React from "react";

interface Props {
  name: string;
}
const Breadcrumb: React.FC<Props> = ({ name }) => {
  return (
    <div className="p-5 bg-white my-5 shadow-md rounded-lg">
      <h1 className="text-xl font-bold text-gray-900">{name}</h1>
    </div>
  );
};

export default Breadcrumb;
