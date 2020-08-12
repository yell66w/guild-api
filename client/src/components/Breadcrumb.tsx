import React from "react";

interface Props {
  name: string;
}
const Breadcrumb: React.FC<Props> = ({ name }) => {
  return (
    <div className="px-5 pt-5 pb-3">
      <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
    </div>
  );
};

export default Breadcrumb;
