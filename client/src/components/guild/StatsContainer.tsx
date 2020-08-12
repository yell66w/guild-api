import React from "react";

interface Props {
  name: string;
  currency: string;
  amount: number;
}

const StatsContainer: React.FC<Props> = ({ amount, name, currency }) => {
  return (
    <div className="flex flex-col bg-green-400 flex-wrap mb-5 mx-5 p-5 items-center rounded-lg md:w-full">
      <div>
        <h1 className="text-3xl font-bold">
          {amount}
          <span>
            <small className="text-xs font-semibold">{currency}</small>
          </span>
        </h1>
      </div>
      <div>
        <small>{name}</small>
      </div>
    </div>
  );
};

export default StatsContainer;
